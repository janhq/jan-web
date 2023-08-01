import Image from "next/image";
import { FC, useState } from "react";
import OverviewPane from "@/screens/AIModelDetail/components/OverviewPane";
import ApiPane from "@/components/ApiPane";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";

type Props = {
  onPromptClick?: (prompt: string) => void;
};

const ModelDetail: FC<Props> = observer(({ onPromptClick }) => {
  const { historyStore } = useStore();
  const [tab, setTab] = useState<"overview" | "api">("overview");
  const conversation = useStore().historyStore.getActiveConversation();
  const title = conversation?.aiModel.title ?? "";
  const avatarUrl = conversation?.aiModel.avatarUrl ?? "";

  const onTabClick = (clickedTab: "overview" | "api") => {
    if (clickedTab === tab) {
      return;
    }
    setTab(clickedTab);
  };

  return (
    <div
      className={`${
        historyStore.showModelDetail ? "w-full" : "hidden"
      } flex flex-col gap-5 h-full px-5 pt-5 pb-3 border-l-[1px] border-[#E5E7EB]`}
    >
      <div className="flex gap-3 items-center">
        <img
          className="rounded-full"
          src={avatarUrl}
          width={38}
          height={38}
          alt=""
        />
        <h2 className="test-black font-bold text-[20px] leading-[25px] tracking-[-0.4px]">
          {title}
        </h2>
      </div>
      <div className="flex-col gap-6 flex items-center flex-1">
        <div className="flex items-center justify-center gap-2 w-[350px]">
          <button
            onClick={() => onTabClick("overview")}
            className={`w-1/2 flex items-center border-b-[1px] justify-center rounded-[4px] py-[6px] px-3 gap-2 relative ${
              tab === "overview"
                ? "before:absolute before:contents[''] before:w-full before:h-[1px] before:bg-[#111928] before:bottom-0 before:left-0"
                : "border-transparent"
            }`}
          >
            <Image
              src={"/icons/unicorn_exclamation-circle.svg"}
              width={20}
              height={20}
              alt=""
            />
            Overview
          </button>
          <button
            onClick={() => onTabClick("api")}
            className={`w-1/2 flex items-center justify-center rounded-[4px] py-[6px] border-b-[1px] px-3 gap-2 relative ${
              tab === "api"
                ? "before:absolute before:contents[''] before:w-full before:h-[1px] before:bg-[#111928] before:bottom-0 before:left-0"
                : "border-transparent"
            }`}
          >
            <Image
              src={"/icons/unicorn_arrow.svg"}
              width={20}
              height={20}
              alt=""
            />
            API
          </button>
        </div>
        {tab === "overview" ? (
          <OverviewPane
            description={conversation?.aiModel.description}
            samples={conversation?.aiModel.defaultPrompts}
            technicalURL={conversation?.aiModel.modelUrl}
            technicalVersion={conversation?.aiModel.modelVersion}
            onPromptClick={onPromptClick}
          />
        ) : (
          <div className="w-[350px]">
            <ApiPane />
          </div>
        )}
      </div>
    </div>
  );
});

export default ModelDetail;
