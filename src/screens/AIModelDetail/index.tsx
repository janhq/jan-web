"use client";

import ApiPane from "@/components/ApiPane";
import { ModelDetailHeader } from "@/components/ModelDetailHeader";
import { SampleImage } from "@/screens/AIModelDetail/components/SampleImage";
import OverviewPane from "@/screens/AIModelDetail/components/OverviewPane";
import { useLayoutEffect, useRef, useState } from "react";
import { Product } from "@/models/Product";

interface AIModelDetailProps {
  product: Product;
}

export const AIModelDetail: React.FC<AIModelDetailProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"overview" | "api">("overview");
  const [inAIModel, setInAIModel] = useState(0);
  const onTabClick = (clickedTab: "overview" | "api") => {
    if (clickedTab === tab) {
      return;
    }
    setTab(clickedTab);
  };
  useLayoutEffect(() => {
    if (!ref.current) return;
    setInAIModel(ref.current.offsetHeight);
  }, []);
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
          <div className="mt-3 h-full" ref={ref}>
            {tab === "overview" ? (
              <OverviewPane
                inAIModel={inAIModel}
                description={props.product.decoration.description}
                samples={
                  props.product.decoration.samples?.length > 0
                    ? props.product.decoration.samples
                        ?.map((e) => e.prompt)
                        .filter((e): e is string => !!e)
                    : props.product.action.suggestedPrompts
                }
                technicalURL={props.product.decoration.technicalURL}
                technicalVersion={props.product.decoration.technicalVersion}
              />
            ) : (
              <ApiPane />
            )}
          </div>
        </div>
        <SampleImage image={props.product.decoration.images[0]} />
      </div>
    </div>
  );
};
