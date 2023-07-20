import { castToSnapshot, types } from "mobx-state-tree";
import { Conversation } from "./Conversation";
import { Shortcut } from "./Shortcut";

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
  }));
