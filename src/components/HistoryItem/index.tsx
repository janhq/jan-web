import { useStore } from "@/models/RootStore";
import Image from "next/image";
import React from "react";

type Props = {
  conversationId: string;
  avatarUrl: string;
  name: string;
  description?: string;
};

const HistoryItem: React.FC<Props> = ({
  conversationId,
  avatarUrl,
  name,
  description,
}) => {
  const { historyStore } = useStore();

  const onClick = () => {
    historyStore.setActiveConversationId(conversationId);
  };

  return (
    <button
      className="flex flex-row items-center gap-2 w-full rounded-[8px] p-2"
      onClick={onClick}
    >
      <Image
        className="rounded-full"
        src={avatarUrl}
        width={36}
        height={36}
        alt=""
      />
      <div className="flex flex-col text-[14px] leading-[20px] w-full">
        <span className="text-[#111928] pb-1 text-left">{name}</span>
        <span className="text-[#9CA3AF] hidden-text text-left">
          {description}
        </span>
      </div>
    </button>
  );
};

export default HistoryItem;
