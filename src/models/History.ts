import { castToSnapshot, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { Shortcut } from "./Shortcut";
import { AiModel, AiModelType } from "./AiModel";
import { User } from "./User";

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

    // just for testing
    testConversation: types.maybe(Conversation),
  })
  .actions((self) => ({
    createTestConversation() {
      const newUser = User.create({
        id: "123",
        displayName: "NamH",
        avatarUrl: "https://google.com",
      });

      const newAiModel = AiModel.create({
        name: "ChatGPT",
        aiModelType: AiModelType.LLM,
        description:
          "With Guanaco, you can lorem ipsum dolor asimet uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        modelUrl: "https://google.com",
        modelVersion: "Guanaco-7B-GGML",
        defaultPrompts: [
          "What is the meaning of life?",
          "What are some key principles for living a meaningful life?",
          "Can you share perspectives on the importance of relationships and social connections?",
          "Can you provide advice on finding and pursuing one's passion?",
        ],
      });

      const newConvo = Conversation.create({
        aiModel: newAiModel,
        user: newUser,
      });

      self.testConversation = newConvo;
    },

    getTestConverstaion() {
      return self.testConversation;
    },

    setActiveConversationId(id: string) {
      self.activeConversationId = id;
    },

    deleteConversationById(id: string) {
      const updateConversations = self.conversations.filter((c) => c.id !== id);
      self.conversations = castToSnapshot([...updateConversations]);
    },

    deleteActiveConversation() {
      if (self.activeConversationId) {
        const updateConversations = self.conversations.filter(
          (c) => c.id !== self.activeConversationId
        );
        self.conversations = castToSnapshot([...updateConversations]);
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
      if (self.activeConversationId) {
        const conversation = self.conversations.find(
          (c) => c.id === self.activeConversationId
        );

        if (conversation) {
          conversation.sendUserMessage(text);
        }
      }
      console.error("No active conversation found");
    },
  }));
