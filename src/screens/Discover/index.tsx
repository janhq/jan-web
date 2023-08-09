"use client";
import { Slider } from "@/components";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import { SpinnerCircularSplit } from "@/components/Indicators/SpinnerCircularSplit";
import { ProductsProps, withProducts } from "@/hooks/withProducts";

const Discover: React.FC<ProductsProps> = (props) => {
  return (
    <div>
      {props.products && props.products?.length > 0 ? (
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
          <ConversationalList
            products={props.categories?.conversationals || []}
          />
          <GenerateImageList
            products={props.categories?.generativeArts || []}
          />
        </>
      ) : (
        <div className="flex flex-1 w-full h-screen justify-center items-center">
          <SpinnerCircularSplit color="#1F2A37" className="-mt-40"/>
        </div>
      )}
    </div>
  );
};

export default withProducts(Discover);
