import { ConversationResponse } from "./api/models/conversation.response";

// TODO: Handle the case that token is expired
export const fetchConversations = async (
  token: string
): Promise<ConversationResponse[]> => {
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
