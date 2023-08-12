import { Product } from "@/_models/Product";
import AiTypeCard from "../AiTypeCard";

interface IAiTypeListProps {
  conversationals: Product[]
  generativeArts: Product[]
}

const AiTypeList: React.FC<IAiTypeListProps> = (props) => {
  const datas = [
    {
      name: "Conversational AIs",
      props: "/icons/ic_conversation_ai.svg",
    },
    {
      name: "Generative Art",
      props: "/icons/ic_generative_art.svg",
    },
  ];

  return (
    <div className="flex flex-col gap-[12px] h-full ">
      {datas.map((item, index) => (
        <AiTypeCard imageUrl={item.props} key={index} name={item.name} />
      ))}
    </div>
  );
};

export default AiTypeList;
