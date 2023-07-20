import { types } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";

export enum MessageType {
  Text = "Text",
  Image = "Image",
}

export enum MessageSenderType {
  Ai = "Ai",
  User = "User",
}

export const ChatMessage = types
  .model("ChatMessage", {
    id: types.optional(types.string, uuidv4()),
    conversationId: types.string,
    messageType: types.enumeration(Object.values(MessageType)),
    messageSenderType: types.enumeration(Object.values(MessageSenderType)),
    senderUid: types.string,

    senderName: types.string,
    senderAvatarUrl: types.maybe(types.string),
    text: types.maybe(types.string),
    imageUrls: types.maybe(types.array(types.string)),
    createdAt: types.optional(types.number, Date.now()),
  })
  .actions((self) => ({
    createTextMessage(
      conversationId: string,
      messageSenderType: MessageSenderType,
      text: string,
      senderUid: string,
      senderName: string,
      senderAvatarUrl?: string
    ) {},

    createImageMessage(
      conversationId: string,
      messageSenderType: MessageSenderType,
      text: string,
      senderUid: string,
      senderName: string,
      senderAvatarUrl?: string
    ) {},
  }));
