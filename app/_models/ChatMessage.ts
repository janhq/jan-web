import { MessageDetailFragment } from "@/graphql";

export enum MessageType {
  Text = "Text",
  Image = "Image",
  ImageWithText = "ImageWithText",
  Error = "Error",
}

export enum MessageSenderType {
  Ai = "Ai",
  User = "User",
}

export enum MessageStatus {
  Ready = "ready",
  Pending = "pending",
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  messageType: MessageType;
  messageSenderType: MessageSenderType;
  senderUid: string;
  senderName: string;
  senderAvatarUrl: string;
  text: string | undefined;
  imageUrls?: string[] | undefined;
  createdAt: number;
  status: MessageStatus;
}

export const toChatMessage = (m: MessageDetailFragment): ChatMessage => {
  const createdAt = new Date(m.created_at).getTime();
  const imageUrls: string[] = [];
  const imageUrl =
    m.message_medias.length > 0 ? m.message_medias[0].media_url : null;
  if (imageUrl) {
    imageUrls.push(imageUrl);
  }

  const messageType = m.message_type
    ? MessageType[m.message_type as keyof typeof MessageType]
    : MessageType.Text;
  const messageSenderType = m.message_sender_type
    ? MessageSenderType[m.message_sender_type as keyof typeof MessageSenderType]
    : MessageSenderType.Ai;

  return {
    id: m.id,
    conversationId: m.conversation_id,
    messageType: messageType,
    messageSenderType: messageSenderType,
    senderUid: m.sender,
    senderName: m.sender_name ?? "",
    senderAvatarUrl: m.sender_avatar_url ?? "/icons/app_icon.svg",
    text: m.content ?? undefined,
    imageUrls: imageUrls,
    createdAt: createdAt,
    status: m.status as MessageStatus,
  };
};
