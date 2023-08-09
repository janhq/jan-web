import HistoryItem from "../HistoryItem";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";

interface IHistoryListProps {
  searchText: string;
}
const HistoryList: React.FC<IHistoryListProps> = observer((props) => {
  const { historyStore } = useStore();

  return (
    <div className="flex flex-col w-full pt-2 mt-3">
      <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px] mb-3">
        HISTORY
      </h2>
      {historyStore.conversations
        .filter(
          (e) =>
            props.searchText === "" ||
            e.aiModel.title
              .toLowerCase()
              .includes(props.searchText.toLowerCase()) ||
            e.aiModel.description
              ?.toLowerCase()
              .includes(props.searchText.toLowerCase())
        )
        .map(({ id, aiModel, updatedAt }) => (
          <HistoryItem
            key={id}
            conversationId={id}
            avatarUrl={aiModel.avatarUrl || ""}
            name={aiModel.title}
            updatedAt={updatedAt}
          />
        ))}
    </div>
  );
});

export default HistoryList;
