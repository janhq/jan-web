import HistoryItem from "../HistoryItem";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";

const HistoryList: React.FC = observer(() => {
  const { historyStore } = useStore();

  return (
    <div className="flex flex-col w-full pt-2">
      <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px]">
        HISTORY
      </h2>
      {historyStore.conversations.map(({ id, aiModel }) => (
        <HistoryItem
          key={id}
          conversationId={id}
          avatarUrl={aiModel.avatarUrl}
          name={aiModel.title}
        />
      ))}
    </div>
  );
});

export default HistoryList;
