import { castToSnapshot, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { Shortcut } from "./Shortcut";
import { AiModel, AiModelType } from "./AiModel";
import { User } from "./User";
import { Product } from "./Product";
import { v4 as uuidv4 } from "uuid";

export const History = types
  .model("History", {
    availableShortcuts: types.optional(types.array(Shortcut), [
      {
        name: "chat-gpt",
        title: "ChatGPT",
        avatarUrl: "https://i.imgur.com/7eX1j5t.png",
      },
      {
        name: "guanaco",
        title: "Guanaco",
        avatarUrl: "https://i.imgur.com/7eX1j5t.png",
      },
      {
        name: "openjourney",
        title: "OpenJourney",
        avatarUrl: "https://i.imgur.com/7eX1j5t.png",
      },
      {
        name: "dreamshaper",
        title: "Dreamshaper",
        avatarUrl: "https://i.imgur.com/7eX1j5t.png",
      },
    ]),
    conversations: types.optional(types.array(Conversation), []),
    activeConversationId: types.maybe(types.string),
  })
  .actions((self) => ({
    createConversationWithModel(product: Product) {
      const newUser = User.create({
        id: "123",
        displayName: "NamH",
      });

      const textPrompts: string[] = [];
      product.action.params.suggestedPrompts?.map((p) => {
        if (typeof p === "string") {
          textPrompts.push(p);
        }
      });

      const newAiModel = AiModel.create({
        name: product.name,
        title: product.decoration.title,
        aiModelType: AiModelType.LLM,
        description: product.decoration.technicalDescription,
        modelUrl: product.decoration.technicalURL,
        modelVersion: product.decoration.technicalVersion,
        avatarUrl: product.decoration.images[0],
        defaultPrompts: textPrompts,
      });

      const newConvo = Conversation.create({
        id: uuidv4(),
        aiModel: newAiModel,
        user: newUser,
      });

      // todo: add some default messages

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

    sendMessageOnActiveConversation(text: string) {
      if (!self.activeConversationId) {
        console.error("No active conversation found");
        return;
      }

      const conversation = self.conversations.find(
        (c) => c.id === self.activeConversationId
      );

      if (!conversation) {
        return;
      }
      conversation.sendUserTextMessage(
        conversation.user.id,
        conversation.user.displayName,
        text,
        conversation.user.avatarUrl
      );

      // TODO: maybe we delay some time to simulate the model processing
      conversation.isWaitingForModelResponse = true;
    },
  }));
