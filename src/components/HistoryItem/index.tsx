import { AiModelType } from "@/models/AiModel";
import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import React from "react";
import JanImage from "../JanImage";

type Props = {
  conversationId: string;
  avatarUrl: string;
  name: string;
  updatedAt?: number;
};

const HistoryItem: React.FC<Props> = observer(
  ({ conversationId, avatarUrl, name, updatedAt }) => {
    const { historyStore } = useStore();

    const onClick = () => {
      historyStore.setActiveConversationId(conversationId);
    };

    const conversation = historyStore.getConversationById(conversationId);
    const isSelected = historyStore.activeConversationId === conversationId;
    const backgroundColor = isSelected ? "bg-gray-100" : "bg-white";

    let rightImageUrl: string | undefined;
    if (conversation && conversation.isWaitingForModelResponse) {
      rightImageUrl = "/icons/loading.svg";
    } else if (
      conversation &&
      conversation.aiModel.aiModelType === AiModelType.GenerativeArt &&
      conversation.lastImageUrl &&
      conversation.lastImageUrl.trim().startsWith("https://")
    ) {
      rightImageUrl = conversation.lastImageUrl;
    }

    return (
      <button
        className={`flex flex-row items-center gap-2 w-full rounded-[8px] p-2 ${backgroundColor}`}
        onClick={onClick}
      >
        <img
          className="rounded-full aspect-square object-cover"
          src={avatarUrl}
          width={36}
          alt=""
        />
        <div className="flex flex-col text-[14px] leading-[20px] w-full">
          <div className="flex flex-row items-center justify-between">
            <span className="text-gray-900 text-left">{name}</span>
          </div>
          <span className="text-gray-400 hidden-text text-left">
            {conversation?.lastTextMessage}
          </span>
        </div>
        {rightImageUrl != null ? (
          <JanImage
            imageUrl={rightImageUrl ?? ""}
            className="rounded-[4px]"
            width={44}
            height={44}
          />
        ) : undefined}
      </button>
    );
  }
);

export default HistoryItem;
