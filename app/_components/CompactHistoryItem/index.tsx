import { activeConversationIdAtom } from "@/_helpers/JotaiWrapper";
import { useAtom } from "jotai";
import Image from "next/image";

type Props = {
  imageUrl: string;
  conversationId: string;
};

const CompactHistoryItem: React.FC<Props> = ({ imageUrl, conversationId }) => {
  const [activeConvoId, setActiveConvoId] = useAtom(activeConversationIdAtom);
  const isSelected = activeConvoId === conversationId;

  return (
    <button
      onClick={() => setActiveConvoId(conversationId)}
      className={`${
        isSelected ? "bg-gray-100" : "bg-transparent"
      } w-14 h-14 rounded-lg`}
    >
      <Image
        className="rounded-full mx-auto"
        src={imageUrl}
        width={36}
        height={36}
        alt=""
      />
    </button>
  );
};

export default CompactHistoryItem;
