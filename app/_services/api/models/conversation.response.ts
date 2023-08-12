import { MessageResponse } from "./message.response";

export type ConversationResponse = {
  id: string | undefined;
  ai_model: string | undefined;
  user_id: string | undefined;
  last_image_url: string | undefined;
  last_text_message: string | undefined;
  created_at: string;
  updated_at: string;
  messages: MessageResponse[];
};
