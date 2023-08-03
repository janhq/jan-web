import HistoryItem from "../HistoryItem";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";

const HistoryList: React.FC = observer(() => {
  const { historyStore } = useStore();

  return (
    <div className="flex flex-col w-full pt-2 mt-3 gap-y-1">
      <h2 className="text-gray-400 font-bold text-[12px] leading-[12px] mb-3 mx-3">
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
