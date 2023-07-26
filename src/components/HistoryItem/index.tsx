import { AiModelType } from "@/models/AiModel";
import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import React from "react";

type Props = {
  conversationId: string;
  avatarUrl: string;
  name: string;
};

const HistoryItem: React.FC<Props> = observer(
  ({ conversationId, avatarUrl, name }) => {
    const { historyStore } = useStore();

    const onClick = () => {
      historyStore.setActiveConversationId(conversationId);
    };

    const conversation = historyStore.getConversationById(conversationId);

    let rightImageUrl: string | undefined;
    if (conversation && conversation.isWaitingForModelResponse) {
      rightImageUrl = "/icons/loading.svg";
    } else if (
      conversation &&
      conversation.aiModel.aiModelType === AiModelType.GenerativeArt
    ) {
      rightImageUrl = conversation.lastImageUrl;
    }

    return (
      <button
        className="flex flex-row items-center gap-2 w-full rounded-[8px] pt-2 pb-2"
        onClick={onClick}
      >
        <img
          className="rounded-full"
          src={avatarUrl}
          width={36}
          height={36}
          alt=""
        />
        <div className="flex flex-col text-[14px] leading-[20px] w-full">
          <span className="text-[#111928] text-left">{name}</span>
          <span className="text-[#9CA3AF] hidden-text text-left">
            {conversation?.lastTextMessage}
          </span>
        </div>
        {rightImageUrl != null ? (
          <img
            className="rounded-[4px]"
            src={rightImageUrl ?? ""}
            width={44}
            height={44}
            alt=""
          />
        ) : undefined}
      </button>
    );
  }
);

export default HistoryItem;
