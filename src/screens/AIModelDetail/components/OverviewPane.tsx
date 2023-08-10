import { useLayoutEffect, useRef, useState } from "react";

interface IOverviewPanelProps {
  description?: string;
  technicalVersion?: string;
  technicalURL?: string;
  samples?: string[];
  onPromptClick?: (prompt: string) => void;
  inAIModel?: number;
}

const OverviewPane: React.FC<IOverviewPanelProps> = ({
  samples = [],
  description,
  technicalVersion,
  technicalURL,
  onPromptClick,
  inAIModel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [read, setRead] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current?.offsetHeight);
  }, [read]);
  useLayoutEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current?.offsetHeight);
  }, []);

  return (
    <div
      className="w-full flex flex-auto flex-col gap-6 overflow-x-hidden"
      ref={ref}
      style={!inAIModel ? { height: `${height}px` } : { height: "100%" }}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-black font-bold">About this AI</h2>
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
      <div className="flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-base">
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280] ">Model Version</span>
          <span className="font-semibold">{technicalVersion}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280]">Model URL</span>
          <a className="text-[#1C64F2] break-all pr-10" href={technicalURL}>
            {technicalURL}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-base">
        <h2 className="font-bold">Try it yourself</h2>
        <ul className="border-[1px] border-[#D1D5DB] rounded-[12px]">
          {samples?.map((item, index) => {
            const showBorder = index === samples.length - 1 ? false : true;
            return (
              <button
                onClick={() => onPromptClick?.(item)}
                key={index}
                className={`text-sm text-gray-500 leading-[20px] flex gap-[10px] border-b-[${
                  showBorder ? "1" : "0"
                }px] border-[#E5E7EB] hover:text-blue-400 text-left p-3 w-full`}
              >
                {item}
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OverviewPane;
