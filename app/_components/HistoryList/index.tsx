import HistoryItem from "../HistoryItem";
import { useEffect, useState } from "react";
import ExpandableHeader from "../ExpandableHeader";
import { useAtomValue } from "jotai";
import { userConversationsAtom } from "@/_helpers/JotaiWrapper";
import useGetUserConversations from "@/_hooks/useGetUserConversations";

const HistoryList: React.FC = () => {
  const conversations = useAtomValue(userConversationsAtom);
  const [expand, setExpand] = useState<boolean>(true);
  const { getUserConversations } = useGetUserConversations();

  useEffect(() => {
    getUserConversations();
  }, []);

  return (
    <div className="flex flex-col flex-grow pt-3">
      <ExpandableHeader
        title="CHAT HISTORY"
        expanded={expand}
        onClick={() => setExpand(!expand)}
      />
      <div
        className={`flex flex-col gap-1 mt-1 ${!expand ? "hidden " : "block"}`}
      >
        {conversations.map((convo) => (
          <HistoryItem
            key={convo.id}
            conversation={convo}
            avatarUrl={convo.product.avatarUrl}
            name={convo.product.name}
            updatedAt={convo.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
