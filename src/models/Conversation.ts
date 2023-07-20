import { types } from "mobx-state-tree";
import { AiModel } from "./AiModel";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, MessageSenderType } from "./ChatMessage";
import { User } from "./User";

export const Conversation = types
  .model("Conversation", {
    /**
     * Unique identifier for the conversation
     */
    id: types.optional(types.string, uuidv4()),

    /**
     * AI model that the conversation is using
     */
    aiModel: types.map(AiModel),

    /**
     * Conversation's messages, should ordered by time (createdAt)
     */
    chatMessages: types.optional(types.array(ChatMessage), []),

    /**
     * User who initiate the chat with the above AI model
     */
    user: types.map(User),

    /**
     * Indicates whether the model is still processing the user's input
     */
    isWaitingForModelResponse: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    sendUserMessage(text: string) {
      //   const newMessage = ChatMessage.create({
      //     conversationId: self.id,
      //     messageSenderType: MessageSenderType.User,
      //     senderUid: self.user.id,
      //     senderName: self.user.displayName,
      //     senderAvatarUrl: self.user.avatarUrl,
      //     text: text,
      //   });
      //   self.chatMessages.push(newMessage);
    },

    createAiResponseMessage() {
      // TODO
    },
  }));
