import { types } from "mobx-state-tree";
import { AiModel } from "./AiModel";
import { ChatMessage, MessageSenderType, MessageType } from "./ChatMessage";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";

export const Conversation = types
  .model("Conversation", {
    /**
     * Unique identifier for the conversation
     */
    id: types.string,

    /**
     * AI model that the conversation is using
     */
    aiModel: AiModel,

    /**
     * Conversation's messages, should ordered by time (createdAt)
     */
    chatMessages: types.optional(types.array(ChatMessage), []),

    /**
     * User who initiate the chat with the above AI model
     */
    user: User,

    /**
     * Indicates whether the model is still processing the user's input
     */
    isWaitingForModelResponse: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    sendUserTextMessage(
      userId: string,
      userName: string,
      text: string,
      avatarUrl?: string
    ) {
      self.chatMessages.push(
        ChatMessage.create({
          id: uuidv4(),
          messageType: MessageType.Text,
          conversationId: self.id,
          messageSenderType: MessageSenderType.User,
          senderUid: userId,
          senderName: userName,
          senderAvatarUrl: avatarUrl,
          text: text,
        })
      );
    },

    sendAiResponseTextMessage(
      modelName: string,
      modelTitle: string,
      modelAvatarUrl: string,
      text: string
    ) {
      self.chatMessages.push(
        ChatMessage.create({
          id: uuidv4(),
          messageType: MessageType.Text,
          conversationId: self.id,
          messageSenderType: MessageSenderType.Ai,
          senderUid: modelName,
          senderName: modelTitle,
          senderAvatarUrl: modelAvatarUrl,
          text: text,
        })
      );
    },
  }));
