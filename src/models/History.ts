import { Instance, castToSnapshot, flow, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { AiModel, AiModelType } from "./AiModel";
import { User } from "./User";
import { Product } from "./Product";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, MessageSenderType, MessageType } from "./ChatMessage";
import { api } from "../services/api";
import { Role } from "../services/api/api.types";

export const History = types
  .model("History", {
    conversations: types.optional(types.array(Conversation), []),
    activeConversationId: types.maybe(types.string),
  })
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
  .actions((self) => ({
    createConversationWithModel(
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

      const newConvo = Conversation.create({
        id: uuidv4(),
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
        const welcomeMsg = ChatMessage.create({
          id: uuidv4(),
          conversationId: newConvo.id,
          messageType: MessageType.Text,
          messageSenderType: MessageSenderType.Ai,
          senderUid: newAiModel.name,
          senderName: newAiModel.title,
          senderAvatarUrl: newAiModel.avatarUrl,
          text: welcomeText,
          createdAt: Date.now(),
        });
        newConvo.addMessage(welcomeMsg);
      }

      self.conversations.push(newConvo);
      self.activeConversationId = newConvo.id;
    },

    setActiveConversationId(id: string) {
      self.activeConversationId = id;
    },

    deleteConversationById(id: string) {
      const updateConversations = self.conversations.filter((c) => c.id !== id);
      self.conversations = castToSnapshot([...updateConversations]);
      self.activeConversationId = undefined;
    },

    deleteActiveConversation() {
      if (self.activeConversationId) {
        const updateConversations = self.conversations.filter(
          (c) => c.id !== self.activeConversationId
        );
        self.conversations = castToSnapshot([...updateConversations]);
        self.activeConversationId = undefined;
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

      const aiResponseMessage = ChatMessage.create({
        id: uuidv4(),
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
          conversation.addMessage(aiResponseMessage);
        },
        onUpdate: (message: string, chunk: string) => {
          aiResponseMessage.setProp("text", message);
          conversation.setProp("updatedAt", Date.now());
        },
        onFinish: (message: string) => {
          conversation.setProp("updatedAt", Date.now());
          conversation.setProp("isWaitingForModelResponse", false);
          conversation.setProp("lastTextMessage", message);
        },
        onError: (err: Error) => {
          console.log("error", err);
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
        const imageResponseMessage = ChatMessage.create({
          id: uuidv4(),
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
      conversation.addMessage(
        ChatMessage.create({
          id: uuidv4(),
          conversationId: self.activeConversationId,
          messageType: MessageType.Text,
          messageSenderType: MessageSenderType.User,
          senderUid: userId,
          senderName: displayName,
          senderAvatarUrl: avatarUrl,
          text: message,
          createdAt: Date.now(),
        })
      );
      conversation.setProp("isWaitingForModelResponse", true);
      conversation.setProp("lastTextMessage", message);

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
    };
  });
