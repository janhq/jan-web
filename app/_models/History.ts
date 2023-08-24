import { Instance, castToSnapshot, flow, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { Product, AiModelType } from "./AiModel";
import { User } from "./User";
import { ChatMessage, MessageSenderType, MessageType } from "./ChatMessage";
import { api } from "../_services/api";
import { Role } from "../_services/api/api.types";
import { MessageResponse } from "@/_services/api/models/message.response";
import { MESSAGE_PER_PAGE } from "../_utils/const";
import { controlNetRequest } from "@/_services/controlnet";
import { ConversationDetailFragment, ProductDetailFragment } from "@/graphql";

export const History = types
  .model("History", {
    conversations: types.optional(types.array(Conversation), []),
    activeConversationId: types.maybe(types.string),
  })
  .volatile(() => ({
    showModelDetail: false,
    showAdvancedPrompt: false,
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

    getConversationById(conversationId: string) {
      return self.conversations.find((c) => c.id === conversationId);
    },
  }))
  .actions((self) => {
    const fetchConversationMessages = flow(function* (convoId: string) {
      const convo = self.getConversationById(convoId);
      if (!convo) {
        console.error("Could not get convo", convoId);
        return;
      }
      if (convo?.isFetching) {
        return;
      }

      if (!convo.hasMore) {
        console.info("Already load all messages of convo", convoId);
        return;
      }
      convo.isFetching = true;

      const result = yield api.getConversationMessages(
        convoId,
        MESSAGE_PER_PAGE,
        convo.offset
      );

      if (result.kind !== "ok") {
        convo.isFetching = false;
        console.error(`Error`, JSON.stringify(result));
        return;
      }

      if (result.messages.length < MESSAGE_PER_PAGE) {
        convo.setHasMore(false);
      }

      convo.offset += result.messages.length;

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
      convo.setProp(
        "chatMessages",
        messages.reverse().concat(convo.chatMessages)
      );
      convo.isFetching = false;
    });

    return { fetchConversationMessages };
  })
  .actions((self) => ({
    // Model detail
    toggleModelDetail() {
      self.showModelDetail = !self.showModelDetail;
    },

    toggleAdvancedPrompt() {
      self.showAdvancedPrompt = !self.showAdvancedPrompt;
    },

    closeModelDetail() {
      if (self.showModelDetail) {
        self.showModelDetail = false;
      }
    },
  }))
  .actions((self) => {
    const fetchMoreMessages = flow(function* () {
      const activeId = self.activeConversationId;
      if (!activeId) {
        console.error("No active conversation found");
        return;
      }
      yield self.fetchConversationMessages(activeId);
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
      fetchMoreMessages,
      deleteConversationById,
    };
  })
  .actions((self) => {
    const setActiveConversationId = flow(function* (
      convoId: string | undefined
    ) {
      self.activeConversationId = convoId;
      if (convoId) {
        yield self.fetchConversationMessages(convoId);
      }
    });

    return { setActiveConversationId };
  })
  .actions((self) => ({
    clearActiveConversationId() {
      self.activeConversationId = undefined;
      self.showModelDetail = false;
      self.showAdvancedPrompt = false;
    },

    setConversations(conversations: Instance<typeof Conversation>[]) {
      self.conversations = castToSnapshot(conversations);
    },

    clearAllConversations() {
      self.conversations = castToSnapshot([]);
    },

    deleteActiveConversation() {
      if (self.activeConversationId) {
        self.deleteConversationById(self.activeConversationId);
      }
    },
  }))
  .actions((self) => {
    const sendTextToTextMessage = flow(function* (
      conversation: Instance<typeof Conversation>
    ) {
      // TODO: handle case timeout using higher order function
      const latestMessages = conversation.chatMessages.slice(-5).map((e) => ({
        role:
          e.messageSenderType === MessageSenderType.User
            ? Role.User
            : Role.Assistant,
        content: e.text,
      }));

      const modelName =
        self.getActiveConversation()?.product.id ?? "gpt-3.5-turbo";

      const result = yield api.createNewTextChatMessage(
        conversation.id,
        MessageSenderType.Ai,
        conversation.product.id,
        conversation.product.name,
        conversation.product.avatarUrl ?? "",
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
        senderUid: conversation.product.id,
        senderName: conversation.product.name,
        senderAvatarUrl: conversation.product.avatarUrl ?? "",
        text: "",
        createdAt: Date.now(),
      });

      let timeoutId: NodeJS.Timeout | undefined = undefined;
      api.streamMessageChat({
        stream: true,
        model: modelName,
        max_tokens: 500,
        messages: latestMessages,
        onOpen: () => {
          conversation.addMessage(aiResponseMessage);
        },
        onUpdate: (message: string) => {
          aiResponseMessage.setProp("text", message);
          conversation.setProp("updatedAt", Date.now());

          // we don't need to wait for the response to be finished, it will
          // make the chat feels laggy
          if (timeoutId) {
            // optimize to reduce invoking api
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            api.updateChatMessage(aiResponseMessage).catch((error) => {
              console.error(`Update chat message error`, error);
            });
          }, 100);
        },
        onFinish: (message: string) => {
          conversation.setProp("updatedAt", Date.now());
          conversation.setProp("lastTextMessage", message);
          conversation.setWaitingForModelResponse(false);
          aiResponseMessage.setProp("text", message);

          setTimeout(() => {
            api.updateChatMessage(aiResponseMessage).catch((error) => {
              console.error(`Update chat message on finish error`, error);
            });
          }, 1000);
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
      const data = yield api.textToImage(conversation.product.id, message);

      if (data.kind !== "ok") {
        console.error(`Error`, JSON.stringify(data));
        conversation.setWaitingForModelResponse(false);
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
          conversation.product.id,
          conversation.product.name,
          conversation.product.avatarUrl ?? "",
          message || "",
          imageUrl,
          MessageType.Image
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
          senderUid: conversation.product.id,
          senderName: conversation.product.name,
          senderAvatarUrl: conversation.product.avatarUrl ?? "",
          text: message,
          imageUrls: data.outputs,
          createdAt: Date.now(),
        });

        conversation.addMessage(imageResponseMessage);
        conversation.setProp("updatedAt", Date.now());
        conversation.setProp("lastImageUrl", data.outputs[0]);
      }
      conversation.setWaitingForModelResponse(false);
    });

    return {
      sendTextToTextMessage,
      sendTextToImageMessage,
    };
  })
  .actions((self) => {
    const sendControlNetPrompt = flow(function* (
      prompt: string,
      negPrompt: string,
      file: any // TODO: file type, for now I don't know what is that
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

      conversation.setWaitingForModelResponse(true);

      const imageUrl = yield controlNetRequest("", prompt, negPrompt, file);
      if (!imageUrl || !imageUrl.startsWith("https://")) {
        console.error(
          "Failed to invoking control net",
          self.activeConversationId
        );
        return;
      }
      const message = `${prompt}. Negative: ${negPrompt}`;
      const createMessageResult = yield api.createNewImageChatMessage(
        conversation.id,
        MessageSenderType.Ai,
        conversation.product.id,
        conversation.product.name,
        conversation.product.avatarUrl ?? "",
        message,
        imageUrl,
        MessageType.ImageWithText
      );

      if (createMessageResult.kind !== "ok") {
        // TODO: display error
        console.error(
          "Error creating user message",
          JSON.stringify(createMessageResult)
        );
        conversation.setWaitingForModelResponse(false);
        return;
      }

      const chatMessage = ChatMessage.create({
        id: createMessageResult.messageId,
        conversationId: self.activeConversationId,
        messageType: MessageType.ImageWithText,
        messageSenderType: MessageSenderType.Ai,
        senderUid: conversation.product.id,
        senderName: conversation.product.name,
        senderAvatarUrl: conversation.product.avatarUrl ?? "",
        text: message,
        imageUrls: [imageUrl],
        createdAt: Date.now(),
      });
      conversation.addMessage(chatMessage);
      conversation.setProp("lastTextMessage", message);
      conversation.setProp("lastImageUrl", imageUrl);
      conversation.setWaitingForModelResponse(false);
    });

    const createConversation = flow(function* (
      conversation: ConversationDetailFragment,
      product: ProductDetailFragment,
      userId: string,
      displayName: string,
      avatarUrl?: string
    ) {
      let modelType: AiModelType | undefined = undefined;
      if (product.inputs.slug === "llm") {
        modelType = AiModelType.LLM;
      } else if (product.inputs.slug === "sd") {
        modelType = AiModelType.GenerativeArt;
      } else if (product.inputs.slug === "controlnet") {
        modelType = AiModelType.ControlNet;
      } else {
        console.error("Model type not supported");
        return;
      }

      const productModel = Product.create({
        name: product.name,
        id: product.slug,
        type: modelType,
        description: product.description,
        modelUrl: product.source_url,
        modelVersion: product.version,
        avatarUrl: product.image_url,
      });

      const newConvo = Conversation.create({
        id: conversation.id,
        product: productModel,
        lastTextMessage: conversation.last_text_message || "",
        user: User.create({
          id: userId,
          displayName,
          avatarUrl,
        }),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

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
      conversation.setWaitingForModelResponse(true);

      const createMessageResult = yield api.createNewTextChatMessage(
        conversation.id,
        MessageSenderType.User,
        userId,
        displayName,
        avatarUrl ?? "",
        message
      );

      if (createMessageResult.kind !== "ok") {
        // TODO: display error
        console.error(
          "Error creating user message",
          JSON.stringify(createMessageResult)
        );
        conversation.setWaitingForModelResponse(false);
        return;
      }

      const userMesssage = ChatMessage.create({
        id: createMessageResult.messageId,
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
      conversation.setProp("lastTextMessage", message);

      if (conversation.product.type === AiModelType.LLM) {
        yield self.sendTextToTextMessage(conversation);
      } else if (conversation.product.type === AiModelType.GenerativeArt) {
        yield self.sendTextToImageMessage(message, conversation);
      } else {
        console.error(
          "We do not support this model type yet:",
          conversation.product.type
        );
      }
    });

    return {
      sendMessage,
      sendControlNetPrompt,
      createConversation,
    };
  });
