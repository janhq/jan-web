"use client";
import { Slider } from "@/components";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import { ProductsProps, withProducts } from "@/hooks/withProducts";

const Discover: React.FC<ProductsProps> = (props) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold mt-3 mb-4 leading-[52px] text-[40px] text-gray-400">
            AIs
          </h2>
        </div>
        <div className="flex gap-20 w-full flex-1">
          <div className="w-full">
            {props.categories?.featured[0] && (
              <div className="gap-5 lg:columns-2 columns-1">
                <Slider product={props.categories.featured[0]} />
                <Slider product={props.categories.featured[1]} />
                
              </div>
            )}
          </div>
        </div>
      </div>
      <ConversationalList products={props.categories?.conversationals || []} />
      <GenerateImageList products={props.categories?.generativeArts || []} />
    </>
  );
};

export default withProducts(Discover);
