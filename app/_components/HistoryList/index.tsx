import HistoryItem from "../HistoryItem";
import { observer } from "mobx-react-lite";
import { useStore } from "@/_models/RootStore";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface IHistoryListProps {
  searchText: string;
}
const HistoryList: React.FC<IHistoryListProps> = observer((props) => {
  const { historyStore } = useStore();
  const [showHistory, setShowHistory] = useState(true);

  return (
    <div className="flex flex-col w-full pl-1 pt-3">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center justify-between px-2"
      >
        <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px]">
          HISTORY
        </h2>
        {showHistory ? (
          <ChevronUpIcon width={24} height={24} />
        ) : (
          <ChevronDownIcon width={24} height={24} />
        )}
      </button>
      <div className={`flex-col gap-1 ${showHistory ? "flex" : "hidden"}`}>
        {historyStore.conversations
          .filter(
            (e) =>
              props.searchText === "" ||
              e.aiModel.name
                .toLowerCase()
                .includes(props.searchText.toLowerCase()) ||
              e.aiModel.description
                ?.toLowerCase()
                .includes(props.searchText.toLowerCase())
          )
          .sort((n1, n2) => (n2.updatedAt || 0) - (n1.updatedAt || 0))
          .map(({ id, aiModel, updatedAt }) => (
            <HistoryItem
              key={id}
              conversationId={id}
              avatarUrl={aiModel.avatarUrl || ""}
              name={aiModel.name}
              updatedAt={updatedAt}
            />
          ))}
      </div>
    </div>
  );
});

export default HistoryList;
