import { FC, useRef, useState } from "react";
import OverviewPane from "../OverviewPane";
import { observer } from "mobx-react-lite";
import { useStore } from "@/_models/RootStore";
import { Draggable } from "../Draggable";
import { TabModelDetail } from "../TabModelDetail";
import ModelInfo from "../ModelInfo";
import ApiPane from "../ApiPane";

type Props = {
  onPromptClick?: (prompt: string) => void;
};

export const ModelDetailSideBar: FC<Props> = observer(({ onPromptClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { historyStore } = useStore();
  const [tab, setTab] = useState<"description" | "api">("description");
  const conversation = useStore().historyStore.getActiveConversation();

  const modelName = conversation?.product.name ?? "";

  const onTabClick = (clickedTab: "description" | "api") => {
    if (clickedTab === tab) {
      return;
    }

    setTab(clickedTab);
  };

  return (
    <div
      style={historyStore.showModelDetail ? { width: "473px" } : {}}
      ref={ref}
      className={`${
        historyStore.showModelDetail ? "w-[473px]" : "hidden"
      } flex flex-col gap-3 h-full p-3 relative pb-3 border-l-[1px] border-[#E5E7EB]`}
    >
      <Draggable targetRef={ref} />
      <ModelInfo
        modelName={modelName}
        inferenceTime={"0.25s - ~3.5s"}
        hardware={"Hardware Nvidia A100 (80GB) GPU"}
        pricing={"$0.0056 - $0.0121"}
      />

      <div className="flex-col h-full gap-3 flex flex-1">
        <TabModelDetail
          onTabClick={(clickedTab: "description" | "api") =>
            onTabClick(clickedTab)
          }
          tab={tab}
        />
        {tab === "api" ? (
          <ApiPane />
        ) : (
          <OverviewPane
            slug={conversation?.product.id ?? ""}
            onPromptClick={onPromptClick}
            description={conversation?.product.description}
            technicalURL={conversation?.product.modelUrl}
            technicalVersion={conversation?.product.modelVersion}
          />
        )}
      </div>
    </div>
  );
});
