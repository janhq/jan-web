import { getAccessToken } from "@/_utils/tokenAccessor";
import { ConversationResponse } from "./api/models/conversation.response";

// TODO: Handle the case that token is expired
export const fetchConversations = async (): Promise<ConversationResponse[]> => {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}conversation`, {
    headers,
  });

  if (!res.ok) {
    console.error("fetchConversations error", res);
    return [];
  }

  const data = await res.json();
  return data as ConversationResponse[];
};
