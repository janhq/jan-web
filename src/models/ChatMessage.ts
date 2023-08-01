import { types } from "mobx-state-tree";
import { withSetPropAction } from "../helpers/withSetPropAction";

export enum MessageType {
  Text = "Text",
  Image = "Image",
  WaitingResponse = "WaitingResponse",
  Error = "Error",
}

export enum MessageSenderType {
  Ai = "Ai",
  User = "User",
}

export const ChatMessage = types
  .model("ChatMessage", {
    id: types.string,
    conversationId: types.string,
    messageType: types.enumeration(Object.values(MessageType)),
    messageSenderType: types.enumeration(Object.values(MessageSenderType)),
    senderUid: types.string,
    senderName: types.string,
    senderAvatarUrl: types.maybe(types.string),
    text: types.maybe(types.string),
    imageUrls: types.maybe(types.array(types.string)),
    createdAt: types.number,
  })
  .actions(withSetPropAction);
