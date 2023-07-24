"use client";
import ApiPane from "@/components/ApiPane";
import { ModelDetailHeader } from "@/components/ModelDetailHeader";
import { SampleImage } from "@/components/SampleImage";
import OverviewPane from "@/components/OverviewPane";
import { useState } from "react";

const ModelDetail: React.FC = () => {
  const [tab, setTab] = useState<"overview" | "api">("overview");
  const onTabClick = (clickedTab: "overview" | "api") => {
    if (clickedTab === tab) {
      return;
    }
    setTab(clickedTab);
  };

  return (
    <div className="container mx-auto">
      <ModelDetailHeader />
      <div className="flex justify-between mt-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 w-[350px]">
            <button
              onClick={() => onTabClick("overview")}
              className={`flex items-center border-b-[1px] justify-center rounded-[4px] py-[6px] px-3 gap-2 relative ${
                tab === "overview"
                  ? "before:absolute before:contents[''] before:w-full before:h-[1px] before:bg-[#111928] before:bottom-0 before:left-0"
                  : "border-transparent"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onTabClick("api")}
              className={`flex items-center justify-center rounded-[4px] py-[6px] border-b-[1px] px-3 gap-2 relative ${
                tab === "api"
                  ? "before:absolute before:contents[''] before:w-full before:h-[1px] before:bg-[#111928] before:bottom-0 before:left-0"
                  : "border-transparent"
              }`}
            >
              API
            </button>
          </div>
          <div className="mt-3">
            {tab === "overview" ? <OverviewPane /> : <ApiPane />}
          </div>
        </div>
        <SampleImage />
      </div>
    </div>
  );
};

export default ModelDetail;
