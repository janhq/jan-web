import React from "react";
import JanImage from "../JanImage";
import { displayDate } from "@/_utils/datetime";
import {
  activeConversationIdAtom,
  conversationStatesAtom,
} from "@/_helpers/JotaiWrapper";
import { useAtom, useAtomValue } from "jotai";
import { ProductType } from "@/_models/Product";
import Image from "next/image";
import { Conversation } from "@/_models/Conversation";

type Props = {
  conversation: Conversation;
  avatarUrl: string;
  name: string;
  updatedAt?: number;
};

const HistoryItem: React.FC<Props> = ({
  conversation,
  avatarUrl,
  name,
  updatedAt,
}) => {
  const conversationStates = useAtomValue(conversationStatesAtom);

  const [activeConversationId, setActiveConversationId] = useAtom(
    activeConversationIdAtom
  );

  const isSelected = activeConversationId === conversation.id;

  const send = true; // TODO store this in mobx

  const onClick = () => {
    if (activeConversationId !== conversation.id) {
      setActiveConversationId(conversation.id);
    }
  };

  const backgroundColor = isSelected
    ? "bg-gray-100 dark:bg-gray-700"
    : "bg-white dark:bg-gray-500";

  let rightImageUrl: string | undefined;
  if (conversationStates[conversation.id]?.waitingForResponse === true) {
    rightImageUrl = "/icons/loading.svg";
  } else if (
    conversation &&
    conversation.product.type === ProductType.GenerativeArt &&
    conversation.lastImageUrl &&
    conversation.lastImageUrl.trim().startsWith("https://")
  ) {
    rightImageUrl = conversation.lastImageUrl;
  }

  return (
    <button
      className={`flex flex-row mx-1 items-center gap-[10px] rounded-lg p-2 ${backgroundColor}`}
      onClick={onClick}
    >
      <Image
        width={36}
        height={36}
        src={avatarUrl}
        className="w-9 aspect-square rounded-full"
        alt=""
      />
      <div className="flex flex-col justify-between text-sm leading-[20px] w-full">
        <div className="flex flex-row items-center justify-between">
          <span className="text-gray-900 text-left">{name}</span>
          <span className="text-[11px] leading-[13px] tracking-[-0.4px] text-gray-400">
            {updatedAt && displayDate(updatedAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex-1">
            <span className="text-gray-400 hidden-text text-left">
              {conversation?.lastTextMessage || <br className="h-5 block" />}
            </span>
          </div>
          {send ? (
            <>
              {rightImageUrl != null ? (
                <JanImage
                  imageUrl={rightImageUrl ?? ""}
                  className="rounded"
                  width={24}
                  height={24}
                />
              ) : undefined}
            </>
          ) : (
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          )}
        </div>
      </div>
    </button>
  );
};

export default HistoryItem;
