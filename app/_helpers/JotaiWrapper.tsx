"use client";

import { ChatMessage, MessageStatus } from "@/_models/ChatMessage";
import { Conversation, ConversationState } from "@/_models/Conversation";
import { Product } from "@/_models/Product";
import { Provider, atom } from "jotai";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function JotaiWrapper({ children }: Props) {
  return <Provider>{children}</Provider>;
}

export const activeConversationIdAtom = atom<string | undefined>(undefined);

export const currentPromptAtom = atom<string>("");

export const showingAdvancedPromptAtom = atom<boolean>(false);
export const showingProductDetailAtom = atom<boolean>(false);
export const showingMobilePaneAtom = atom<boolean>(false);

/**
 * Stores all conversations for the current user
 */
export const userConversationsAtom = atom<Conversation[]>([]);
export const currentConversationAtom = atom<Conversation | undefined>((get) =>
  get(userConversationsAtom).find((c) => c.id === get(activeConversationIdAtom))
);

/**
 * Stores all conversation states for the current user
 */
export const conversationStatesAtom = atom<Record<string, ConversationState>>(
  {}
);
export const addNewConversationStateAtom = atom(
  null,
  (get, set, conversationId: string, state: ConversationState) => {
    const currentState = { ...get(conversationStatesAtom) };
    currentState[conversationId] = state;
    set(conversationStatesAtom, currentState);
  }
);
export const updateConversationWaitingForResponseAtom = atom(
  null,
  (get, set, conversationId: string, waitingForResponse: boolean) => {
    const currentState = { ...get(conversationStatesAtom) };
    currentState[conversationId] = {
      ...currentState[conversationId],
      waitingForResponse,
    };
    set(conversationStatesAtom, currentState);
  }
);
export const updateConversationHasMoreAtom = atom(
  null,
  (get, set, conversationId: string, hasMore: boolean) => {
    const currentState = { ...get(conversationStatesAtom) };
    currentState[conversationId] = { ...currentState[conversationId], hasMore };
    set(conversationStatesAtom, currentState);
  }
);

/**
 * Stores all chat messages for all conversations
 */
export const chatMessages = atom<Record<string, ChatMessage[]>>({});
export const currentChatMessagesAtom = atom<ChatMessage[]>((get) => {
  const activeConversationId = get(activeConversationIdAtom);
  if (!activeConversationId) return [];
  return get(chatMessages)[activeConversationId] ?? [];
});
export const addOldMessagesAtom = atom(
  null,
  (get, set, newMessages: ChatMessage[]) => {
    const currentConvoId = get(activeConversationIdAtom);
    if (!currentConvoId) return;

    const currentMessages = get(chatMessages)[currentConvoId] ?? [];
    const updatedMessages = [...currentMessages, ...newMessages];

    const newData: Record<string, ChatMessage[]> = {
      ...get(chatMessages),
    };
    newData[currentConvoId] = updatedMessages;
    set(chatMessages, newData);
  }
);
export const addNewMessageAtom = atom(
  null,
  (get, set, newMessage: ChatMessage) => {
    const currentConvoId = get(activeConversationIdAtom);
    if (!currentConvoId) return;

    const currentMessages = get(chatMessages)[currentConvoId] ?? [];
    const updatedMessages = [newMessage, ...currentMessages];

    const newData: Record<string, ChatMessage[]> = {
      ...get(chatMessages),
    };
    newData[currentConvoId] = updatedMessages;
    set(chatMessages, newData);
  }
);
/**
 * For updating the status of the last AI message that is pending
 */
export const updateLastMessageAsReadyAtom = atom(
  null,
  (get, set, id, text: string) => {
    const currentConvoId = get(activeConversationIdAtom);
    if (!currentConvoId) return;

    const currentMessages = get(chatMessages)[currentConvoId] ?? [];
    const messageToUpdate = currentMessages.find((e) => e.id === id);

    // if message is not found, do nothing
    if (!messageToUpdate) return;

    const index = currentMessages.indexOf(messageToUpdate);
    const updatedMsg: ChatMessage = {
      ...messageToUpdate,
      status: MessageStatus.Ready,
      text: text,
    };

    currentMessages[index] = updatedMsg;
    const newData: Record<string, ChatMessage[]> = {
      ...get(chatMessages),
    };
    newData[currentConvoId] = currentMessages;
    set(chatMessages, newData);
  }
);

export const currentProductAtom = atom<Product | undefined>(
  (get) =>
    get(userConversationsAtom).find(
      (c) => c.id === get(activeConversationIdAtom)
    )?.product
);

export const searchAtom = atom<string>("");

// modal atoms
export const showConfirmDeleteConversationModalAtom = atom(false);
export const showConfirmSignOutModalAtom = atom(false);
