import { Instance, castToSnapshot, flow, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { AiModel, AiModelType } from "./AiModel";
import { User } from "./User";
import { Product } from "./Product";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, MessageSenderType, MessageType } from "./ChatMessage";
import { api } from "../services/api";
import { Role } from "../services/api/api.types";
import { MessageResponse } from "@/services/api/models/message.response";

export const History = types
  .model("History", {
    conversations: types.optional(types.array(Conversation), []),
    activeConversationId: types.maybe(types.string),
  })
  .volatile(() => ({
    showModelDetail: false,
  }))
  .views((self) => ({
    getActiveConversation() {
      if (self.activeConversationId) {
        return self.conversations.find(
          (c) => c.id === self.activeConversationId
        );
      }
    },

    getActiveMessages() {
      if (self.activeConversationId) {
        const conversation = self.conversations.find(
          (c) => c.id === self.activeConversationId
        );

        if (conversation) {
          return conversation.chatMessages;
        }
      }
      return [];
    },
  }))
  .actions((self) => {
    const fetchMessages = flow(function* (convoId: string) {
      const result = yield api.getConversationMessages(convoId, 10, 0); // TODO passing in the limit and offset

      if (result.kind !== "ok") {
        console.error(`Error`, JSON.stringify(result));
        return;
      }
      const messages: Instance<typeof ChatMessage>[] = [];
      result.messages.forEach((m: MessageResponse) => {
        const createdAt = new Date(m.created_at).getTime();
        const imageUrls: string[] = [];
        const imageUrl = m.images.length > 0 ? m.images[0].image_url : null;
        if (imageUrl) {
          imageUrls.push(imageUrl);
        }

        const messageType =
          MessageType[m.message_type as keyof typeof MessageType];
        const messageSenderType =
          MessageSenderType[
            m.message_sender_type as keyof typeof MessageSenderType
          ];
        messages.push(
          ChatMessage.create({
            id: m.id,
            conversationId: m.conversation_id,
            messageType: messageType,
            messageSenderType: messageSenderType,
            senderUid: m.sender_uuid,
            senderName: m.sender_name,
            senderAvatarUrl: m.sender_avatar_url,
            text: m.content,
            imageUrls: imageUrls,
            createdAt: createdAt,
          })
        );
      });

      self.getActiveConversation()?.pushMessages(messages);
    });

    return { fetchMessages };
  })
  .actions((self) => ({
    // Model detail
    toggleModelDetail() {
      self.showModelDetail = !self.showModelDetail;
    },

    closeModelDetail() {
      if (self.showModelDetail) {
        self.showModelDetail = false;
      }
    },
  }))
  .actions((self) => {
    const getConversationMessages = flow(function* (convoId: string) {
      const result = yield api.getConversationMessages(convoId, 10, 0);
    });

    const deleteConversationById = flow(function* (convoId: string) {
      const result = yield api.deleteConversation(convoId);
      if (result.kind !== "ok") {
        console.error(`Error`, JSON.stringify(result));
        return;
      }

      const updateConversations = self.conversations.filter(
        (c) => c.id !== convoId
      );
      self.conversations = castToSnapshot([...updateConversations]);
      self.activeConversationId = undefined;
    });

    return {
      getConversationMessages,
      deleteConversationById,
    };
  })
  .actions((self) => {
    const setActiveConversationId = flow(function* (convoId: string) {
      self.activeConversationId = convoId;
      yield self.fetchMessages(convoId);
    });

    return { setActiveConversationId };
  })
  .actions((self) => ({
    setConversations(conversations: Instance<typeof Conversation>[]) {
      self.conversations = castToSnapshot(conversations);
      if (conversations.length > 0) {
        self.activeConversationId = conversations[0].id;
      }
    },

    clearAllConversations() {
      self.conversations = castToSnapshot([]);
    },

    deleteActiveConversation() {
      if (self.activeConversationId) {
        self.deleteConversationById(self.activeConversationId);
      }
    },

    getConversationById(conversationId: string) {
      return self.conversations.find((c) => c.id === conversationId);
    },
  }))
  .actions((self) => {
    const sendTextToTextMessage = flow(function* (
      conversation: Instance<typeof Conversation>
    ) {
      // TODO: handle case timeout using higher order function
      const latestMessages = conversation.chatMessages
        .slice(0, 10)
        .map((e) => ({
          role:
            e.messageSenderType === MessageSenderType.User
              ? Role.User
              : Role.Assistant,
          content: e.text,
        }));

      const modelName =
        self.getActiveConversation()?.aiModel.name ?? "gpt-3.5-turbo";

      const result = yield api.createNewTextChatMessage(
        conversation.id,
        MessageSenderType.Ai,
        conversation.aiModel.name,
        conversation.aiModel.title,
        conversation.aiModel.avatarUrl,
        ""
      );

      if (result.kind !== "ok") {
        // TODO: show error message
        console.error(
          `Error while creating response message`,
          JSON.stringify(result)
        );
        return;
      }

      const aiResponseMessage = ChatMessage.create({
        id: result.messageId,
        conversationId: conversation.id,
        messageType: MessageType.Text,
        messageSenderType: MessageSenderType.Ai,
        senderUid: conversation.aiModel.name,
        senderName: conversation.aiModel.title,
        senderAvatarUrl: conversation.aiModel.avatarUrl,
        text: "",
        createdAt: Date.now(),
      });

      api.streamMessageChat({
        stream: true,
        model: modelName,
        max_tokens: 500,
        messages: latestMessages,
        onOpen: () => {
          // TODO: maybe showing ... while waiting for response
          conversation.addMessage(aiResponseMessage);
        },
        onUpdate: (message: string, chunk: string) => {
          aiResponseMessage.setProp("text", message);
          conversation.setProp("updatedAt", Date.now());

          // we don't need to wait for the response to be finished, it will
          // make the chat feels laggy
          api
            .updateChatMessage(aiResponseMessage)
            .then((result) => {
              console.log(`Update chat message ok`, result);
            })
            .catch((error) => {
              console.error(`Update chat message error`, error);
            });
        },
        onFinish: (message: string) => {
          conversation.setProp("updatedAt", Date.now());
          conversation.setProp("isWaitingForModelResponse", false);
          conversation.setProp("lastTextMessage", message);
          aiResponseMessage.setProp("text", message);

          api
            .updateChatMessage(aiResponseMessage)
            .then((result) => {
              console.log(`Update chat message on finish ok`, result);
            })
            .catch((error) => {
              console.error(`Update chat message on finish error`, error);
            });
        },
        onError: (err: Error) => {
          console.error("error", err);
        },
      });
    });

    const sendTextToImageMessage = flow(function* (
      message: string,
      conversation: Instance<typeof Conversation>
    ) {
      // TODO: handle case timeout using higher order function
      const data = yield api.textToImage(conversation.aiModel.modelId, message);

      if (data.kind !== "ok") {
        console.error(`Error`, JSON.stringify(data));
        conversation.setProp("isWaitingForModelResponse", false);
        return;
      }

      if (
        data.outputs &&
        data.outputs.length > 0 &&
        data.outputs[0].startsWith("https://")
      ) {
        const imageUrl: string = data.outputs[0];
        const result = yield api.createNewImageChatMessage(
          conversation.id,
          MessageSenderType.Ai,
          conversation.aiModel.name,
          conversation.aiModel.title,
          conversation.aiModel.avatarUrl,
          "",
          imageUrl
        );

        if (result.kind !== "ok") {
          // TODO: showing error dialog
          console.error("Error while create message", JSON.stringify(result));
          return;
        }

        const imageResponseMessage = ChatMessage.create({
          id: result.messageId,
          conversationId: conversation.id,
          messageType: MessageType.Image,
          messageSenderType: MessageSenderType.Ai,
          senderUid: conversation.aiModel.name,
          senderName: conversation.aiModel.title,
          senderAvatarUrl: conversation.aiModel.avatarUrl,
          imageUrls: data.outputs,
          createdAt: Date.now(),
        });

        conversation.addMessage(imageResponseMessage);
        conversation.setProp("updatedAt", Date.now());
        conversation.setProp("lastImageUrl", data.outputs[0]);
      }
      conversation.setProp("isWaitingForModelResponse", false);
    });

    return {
      sendTextToTextMessage,
      sendTextToImageMessage,
    };
  })
  .actions((self) => {
    const createConversation = flow(function* (
      product: Product,
      userId: string,
      displayName: string,
      avatarUrl?: string
    ) {
      const textPrompts: string[] = [];
      product.action.params.suggestedPrompts?.map((p) => {
        if (typeof p === "string") {
          textPrompts.push(p);
        }
      });

      let modelType = AiModelType.LLM;
      if (product.decoration.tags.includes("Awesome Art")) {
        modelType = AiModelType.GenerativeArt;
      }

      const modelId = product.action.params.models[0].name;
      if (!modelId) {
        console.error("No model id found");
        return;
      }

      const newAiModel = AiModel.create({
        name: product.name,
        modelId: modelId,
        title: product.decoration.title,
        aiModelType: modelType,
        description: product.decoration.technicalDescription,
        modelUrl: product.decoration.technicalURL,
        modelVersion: product.decoration.technicalVersion,
        avatarUrl: product.decoration.images[0],
        defaultPrompts: textPrompts,
      });

      const createConvoResult = yield api.createConversation(modelId);
      if (createConvoResult.kind !== "ok") {
        // TODO showing error dialog
        console.error(`Error`, JSON.stringify(createConvoResult));
        return;
      }

      const newConvo = Conversation.create({
        id: createConvoResult.conversationId,
        aiModel: newAiModel,
        user: User.create({
          id: userId,
          displayName,
          avatarUrl,
        }),
        createdAt: Date.now(),
      });

      const welcomeText = product.action.params.welcomeMessage;
      if (welcomeText) {
        const createMsgResult = yield api.createNewTextChatMessage(
          newConvo.id,
          MessageSenderType.Ai,
          newAiModel.modelId,
          newAiModel.title,
          newAiModel.avatarUrl,
          welcomeText
        );

        if (createMsgResult.kind !== "ok") {
          // TODO: handle case bad-data
          console.error(
            `Create message error`,
            JSON.stringify(createMsgResult)
          );
          return;
        }

        const welcomeMsg = ChatMessage.create({
          id: createMsgResult.messageId,
          conversationId: newConvo.id,
          messageType: MessageType.Text,
          messageSenderType: MessageSenderType.Ai,
          senderUid: newAiModel.modelId,
          senderName: newAiModel.title,
          senderAvatarUrl: newAiModel.avatarUrl,
          text: welcomeText,
          createdAt: Date.now(),
        });
        newConvo.addMessage(welcomeMsg);
      }

      self.conversations.push(newConvo);
      self.activeConversationId = newConvo.id;
    });

    const sendMessage = flow(function* (
      message: string,
      userId: string,
      displayName: string,
      avatarUrl?: string
    ) {
      if (!self.activeConversationId) {
        console.error("No active conversation found");
        return;
      }

      const conversation = self.getActiveConversation();
      if (!conversation) {
        console.error(
          "No active conversation found with id",
          self.activeConversationId
        );
        return;
      }

      // adding user message
      const userMesssage = ChatMessage.create({
        id: uuidv4(),
        conversationId: self.activeConversationId,
        messageType: MessageType.Text,
        messageSenderType: MessageSenderType.User,
        senderUid: userId,
        senderName: displayName,
        senderAvatarUrl: avatarUrl,
        text: message,
        createdAt: Date.now(),
      });
      conversation.addMessage(userMesssage);
      conversation.setProp("isWaitingForModelResponse", true);
      conversation.setProp("lastTextMessage", message);
      conversation.setProp("isFresh", false);

      const createUserMessageResult = yield api.createNewTextChatMessage(
        conversation.id,
        userMesssage.messageSenderType,
        userMesssage.senderUid,
        userMesssage.senderName,
        userMesssage.senderAvatarUrl ?? "",
        userMesssage.text ?? ""
      );

      if (conversation.aiModel.aiModelType === AiModelType.LLM) {
        yield self.sendTextToTextMessage(conversation);
      } else if (
        conversation.aiModel.aiModelType === AiModelType.GenerativeArt
      ) {
        yield self.sendTextToImageMessage(message, conversation);
      } else {
        console.error(
          "We do not support this model type yet:",
          conversation.aiModel.aiModelType
        );
      }
    });

    return {
      sendMessage,
      createConversation,
    };
  });
