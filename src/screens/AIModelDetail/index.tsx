"use client";

import ApiPane from "@/components/ApiPane";
import { ModelDetailHeader } from "@/components/ModelDetailHeader";
import { SampleImage } from "@/screens/AIModelDetail/components/SampleImage";
import OverviewPane from "@/screens/AIModelDetail/components/OverviewPane";
import { useLayoutEffect, useRef, useState } from "react";
import { ProductsProps } from "@/services/products";

interface AIModelDetailProps extends ProductsProps {
  slug: string;
}
const AIModelDetail: React.FC<AIModelDetailProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"overview" | "api">("overview");
  const [inAIModel, setInAIModel] = useState(0);
  const product = props.products?.find((e) => e.name === props.slug);
  const onTabClick = (clickedTab: "overview" | "api") => {
    if (clickedTab === tab) {
      return;
    }
    setTab(clickedTab);
  };
  useLayoutEffect(() => {
    if (!ref.current) return;
    setInAIModel(ref.current.offsetHeight);
  }, [product]);

  return (
    <div className="container mx-auto">
      {product && (
        <div>
          <ModelDetailHeader
            modelTitle={product.decoration.title}
            productId={product.name}
          />
          <div className="flex justify-between mt-2 mb-12 gap-8">
            <div className="flex flex-col flex-1">
              <div className="mt-3 h-full flex-1" ref={ref}>
                {tab === "overview" ? (
                  <OverviewPane
                    productId={product.name}
                    inAIModel={inAIModel}
                    description={product.decoration.description}
                    samples={
                      product.decoration.samples?.length > 0
                        ? product.decoration.samples
                            ?.map((e) => e.prompt)
                            .filter((e): e is string => !!e)
                        : product.action.suggestedPrompts
                    }
                    technicalURL={product.decoration.technicalURL}
                    technicalVersion={product.decoration.technicalVersion}
                    technicalDescription={
                      product.decoration.technicalDescription
                    }
                  />
                ) : (
                  <ApiPane />
                )}
              </div>
            </div>
            <div className="overflow-hidden">
              <SampleImage image={product.decoration.images[0]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIModelDetail;
