import classNames from "classnames";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

interface IOverviewPanelProps {
  productId?: string;
  description?: string | null;
  technicalVersion?: string | null;
  technicalDescription?: string | null;
  technicalURL?: string | null;
  samples?: string[];
  onPromptClick?: (prompt: string) => void;
  inAIModel?: number;
}
const OverviewPane: React.FC<IOverviewPanelProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [read, setRead] = useState<boolean>(true);
  const [readMoreTechnical, setReadMoreTechnical] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);

  const {
    samples = [],
    description,
    technicalVersion,
    technicalURL,
    technicalDescription,
    onPromptClick,
    inAIModel,
  } = props;

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
      className={classNames(
        props.productId ? "w-full" : "w-[350px]",
        "flex flex-auto flex-col gap-6 overflow-x-hidden"
      )}
      ref={ref}
      style={!inAIModel ? { height: `${height}px` } : { height: "100%" }}
    >
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-black font-bold">About this AI</h2>
        <p className={`text-[#6B7280] ${read ? "hidden-text-model" : ""}`}>
          {description}
        </p>
        <button
          onClick={() => setRead(!read)}
          className="text-[#1F2A37] font-bold"
        >
          {read ? "read more" : "read less"}
        </button>
      </div>
      <div className="flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-[16px]">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-black font-bold">Technical Details</h3>
          <p
            className={`text-[#6B7280] ${
              readMoreTechnical ? "hidden-text-model" : ""
            }`}
          >
            {technicalDescription}
          </p>
          <button
            onClick={() => setReadMoreTechnical(!readMoreTechnical)}
            className="text-[#1F2A37] font-bold"
          >
            {readMoreTechnical ? "read more" : "read less"}
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280] ">Model Version</span>
          <span className="font-semibold">{technicalVersion}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#6B7280]">Model URL</span>
          <a
            className="text-[#1C64F2] break-all pr-10"
            href={technicalURL || "#"}
          >
            {technicalURL}
          </a>
        </div>
      </div>
      {samples.length > 0 && (
        <div className="max-w-xl flex flex-col gap-4 tracking-[-0.4px] leading-[22px] text-[16px]">
          <h2 className="font-bold">Try it yourself</h2>
          <ul className="border-[1px] border-[#D1D5DB] rounded-[12px]">
            {samples?.map((prompt, index) => {
              const showBorder = index === samples.length - 1 ? false : true;
              return (
                <div key={prompt}>
                  {props.productId ? (
                    <Link
                      href={{
                        pathname: `/chat`,
                        query: {
                          productId: props.productId,
                          prompt: prompt || undefined,
                        },
                      }}
                      key={index}
                      className={`text-sm text-gray-500 leading-[20px] flex gap-[10px] border-b-[${
                        showBorder ? "1" : "0"
                      }px] border-[#E5E7EB] hover:text-blue-400 text-left p-3 w-full`}
                    >
                      {prompt}
                    </Link>
                  ) : (
                    <button
                      onClick={() => onPromptClick?.(prompt)}
                      key={index}
                      className={`text-sm text-gray-500 leading-[20px] flex gap-[10px] border-b-[${
                        showBorder ? "1" : "0"
                      }px] border-[#E5E7EB] hover:text-blue-400 text-left p-3 w-full`}
                    >
                      {prompt}
                    </button>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OverviewPane;
