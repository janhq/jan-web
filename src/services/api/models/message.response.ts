export type MessageResponse = {
  id: string;
  conversation_id: string;
  message_type: string;
  message_sender_type: string;
  sender_uuid: string;
  sender_name: string;
  sender_avatar_url: string | undefined;
  content: string | undefined;
  created_at: string;
  updated_at: string;
  images: MessageImageResponse[];
};

export type MessageImageResponse = {
  id: number;
  message_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};
