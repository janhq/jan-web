import HistoryItem from "../HistoryItem";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";
import Image from "next/image";
import { useState } from "react";

const HistoryList: React.FC = observer(() => {
  const { historyStore } = useStore();
  const [showHistory, setShowHistory] = useState(true);

  return (
    <div className="flex flex-col w-full px-1 pt-3">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center justify-between px-2"
      >
        <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px]">
          HISTORY
        </h2>
        <Image
          className={`${showHistory ? "" : "rotate-180"}`}
          src={"/icons/unicorn_angle-up.svg"}
          width={24}
          height={24}
          alt=""
        />
      </button>
      <div className={`flex-col gap-1 ${showHistory ? "flex" : "hidden"}`}>
        {historyStore.conversations.map(({ id, aiModel, updatedAt }) => (
          <HistoryItem
            key={id}
            conversationId={id}
            avatarUrl={aiModel.avatarUrl}
            name={aiModel.title}
            updatedAt={updatedAt}
          />
        ))}
      </div>
    </div>
  );
});

export default HistoryList;
