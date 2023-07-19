import { ChatIcon, GenerativeArt, PhoneIcon, LibraryIcon } from "@/assets";
import AiTypeCard from "../AiTypeCard";

const AiTypeList: React.FC = () => {
  const datas = [
    {
      name: "Conversational AIs",
      props: <ChatIcon />,
    },
    {
      name: "Generative Art",
      props: <GenerativeArt />,
    },
    {
      name: "On-Device AI",
      props: <PhoneIcon />,
    },
    {
      name: "Prompt Library",
      props: <LibraryIcon />,
    },
  ];

  return (
    <div className="flex flex-col gap-[12px]">
      {datas.map((item, index) => (
        <AiTypeCard key={index} name={item.name}>
          {item.props}
        </AiTypeCard>
      ))}
    </div>
  );
};

export default AiTypeList;
