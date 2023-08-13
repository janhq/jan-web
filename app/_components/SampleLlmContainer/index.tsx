import { Instance } from "mobx-state-tree";
import Image from "next/image";
import { AiModel } from "@/_models/AiModel";
import ShowMoreButton from "../ShowMoreButton";

type Props = {
  model: Instance<typeof AiModel>;
  onPromptSelected: (prompt: string) => void;
};

const SampleLlmContainer: React.FC<Props> = ({ model, onPromptSelected }) => {
  const shouldDisplayShowMore = false;
  const onShowMoreClick = () => {};

  return (
    <div className="flex flex-col h-full gap-9 items-center pt-6">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-[22px] leading-[28px] font-bold">{model.title}</h2>
        <div className="text-xs leading-[18px] flex flex-col gap-1 items-center">
          <div className="flex gap-2">
            Operated by
            <Image src={"/icons/ico_logo.svg"} width={42} height={22} alt="" />
          </div>
          <span className="text-sm">Powerful chatbot from {model.name}</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-xl leading-[25px] tracking-[-0.4px]">
          Try now
        </h2>
        <div className="flex flex-col items-center gap-[9px]">
          <ul>
            {model.defaultPrompts.map((item, index) => (
              <li key={item}>
                <button
                  onClick={() => onPromptSelected(item)}
                  className="rounded p-2 gap-[10px] hover:bg-[#0000000F] text-xs leading-[18px] text-gray-500"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          {shouldDisplayShowMore && (
            <div className="w-full">
              <ShowMoreButton onClick={onShowMoreClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleLlmContainer;
