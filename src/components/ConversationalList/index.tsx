import ConversationalCard from "../ConversationalCard";
import Image from "next/image";

const ConversationalList: React.FC = () => {
  const datas = [
    {
      title: "Aurora",
      description: "Surreal and abstract compositions intertwining reality.",
      children: "/icons/guanaco.png",
    },
    {
      title: "Guanaco",
      description: "Intricate portraits capturing the essence within.",
      children: "/icons/guanaco.png",
    },
    {
      title: "Guanaco",
      description: "Futuristic cityscapes pulsating with neon energy",
      children: "/icons/guanaco.png",
    },
    {
      title: "Guanaco",
      description: "Whimsical illustrations inspired by folklore tales",
      children: "/icons/guanaco.png",
    },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mt-4 mb-2">
        <Image src={"/icons/messicon.svg"} width={24} height={24} alt="" />
        <span className="font-bold text-gray-900">Conversational</span>
      </div>
      <div className="flex gap-2">
        {datas.map((item, index) => (
          <ConversationalCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ConversationalList;
