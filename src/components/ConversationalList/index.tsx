import {
  MessageIcon,
  AuroraIcon,
  GuanacoIcon,
  WhimsicalIcon,
  FuturisticIcon,
} from "@/assets";
import ConversationalCard from "../ConversationalCard";

const ConversationalList: React.FC = () => {
  const datas = [
    {
      title: "Aurora",
      description: "Surreal and abstract compositions intertwining reality.",
      children: <AuroraIcon />,
    },
    {
      title: "Guanaco",
      description: "Intricate portraits capturing the essence within.",
      children: <GuanacoIcon />,
    },
    {
      title: "Guanaco",
      description: "Futuristic cityscapes pulsating with neon energy",
      children: <FuturisticIcon />,
    },
    {
      title: "Guanaco",
      description: "Whimsical illustrations inspired by folklore tales",
      children: <WhimsicalIcon />,
    },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mt-4 mb-2">
        <MessageIcon />
        <span className="font-bold text-gray-900">Conversational</span>
      </div>
      <div className="flex gap-2">
        {datas.map((item, index) => (
          <ConversationalCard
            key={index}
            description={item.description}
            title={item.title}
          >
            {item.children}
          </ConversationalCard>
        ))}
      </div>
    </div>
  );
};

export default ConversationalList;
