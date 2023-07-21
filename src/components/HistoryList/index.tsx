import avartar from "@/assets/Thumbnail02.png";
import HistoryItem from "../HistoryItem";

type Props = {
  onHistoryClicked: (conversationId: string) => void;
};

const HistoryList: React.FC<Props> = ({ onHistoryClicked }) => {
  const datas = [
    {
      name: "chat gpt",
      avatar: avartar.src,
      description:
        "There's a profound joy that comes from lacing up my running shoes, hitting the pavement, and letting the world blur by. In each stride, I find solace, empowermen",
    },
    {
      name: "chat gpt",
      avatar: avartar.src,
      description:
        "There's a profound joy that comes from lacing up my running shoes, hitting the pavement, and letting the world blur by. In each stride, I find solace, empowermen",
    },
    {
      name: "chat gpt",
      avatar: avartar.src,
      description:
        "There's a profound joy that comes from lacing up my running shoes, hitting the pavement, and letting the world blur by. In each stride, I find solace, empowermen",
    },
  ];

  return (
    <div className="flex flex-col pt-2">
      <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px]">
        HISTORY
      </h2>
      {datas.map((item, index) => (
        <HistoryItem key={index} {...item} />
      ))}
    </div>
  );
};

export default HistoryList;
