import { useState } from "react";
import { useStore } from "../../models/RootStore";

const OverviewPane: React.FC = () => {
  const [read, setRead] = useState<boolean>(true);
  const { historyStore } = useStore();
  const conversation = historyStore.getTestConverstaion();

  if (!conversation) {
    return <></>;
  }

  const { description, modelVersion, modelUrl, defaultPrompts } =
    conversation.aiModel;

  return (
    <div className="w-[350px] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#000000] font-bold">About this AI</h2>
        <span>
          <p className={`text-[#6B7280] ${read ? "hidden-text-model" : ""}`}>
            {description}
          </p>
          <button
            onClick={() => setRead(!read)}
            className="text-[#1F2A37] font-bold"
          >
            {read ? "read more" : "read less"}
          </button>
        </span>
      </div>
      <div className="flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-[16px]">
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280] ">Model Version</span>
          <span className="font-semibold">{modelVersion}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280]">Model URL</span>
          <a className="text-[#1C64F2] break-all pr-10" href={modelUrl}>
            {modelUrl}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-[16px]">
        <h2 className="font-bold">Try it yourself</h2>
        <ul className="border-[1px] border-[#D1D5DB] rounded-[12px]">
          {defaultPrompts.map((item, index) => (
            <li
              key={index}
              className="text-[14px] leading-[20px] flex p-[12px] gap-[10px] border-b-[1px] border-[#E5E7EB] hover:text-blue-400 last:border-b-[0px]"
            >
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewPane;
