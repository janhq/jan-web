import AiTypeCard from "../AiTypeCard";

const AiTypeList: React.FC = () => {
  const datas = [
    {
      name: "Conversational AIs",
      props: "/icons/ic_conversation_ai.svg",
    },
    {
      name: "Generative Art",
      props: "/icons/ic_generative_art.svg",
    },
    {
      name: "On-Device AI",
      props: "/icons/ic_on_device_ai.svg",
    },
    {
      name: "Prompt Library",
      props: "/icons/ic_prompt_library.svg",
    },
  ];

  return (
    <div className="flex flex-col gap-[12px]">
      {datas.map((item, index) => (
        <AiTypeCard imageUrl={item.props} key={index} name={item.name} />
      ))}
    </div>
  );
};

export default AiTypeList;
