import React, { useEffect, useState } from "react";
import AiSearch from "@/components/AiSearch";
import Slider from "@/components/Slider";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";
import { Product, Section } from "@/models/Product";
import { fetchDiscover } from "@/services/products";

const NewChatBlankState: React.FC = () => {
  const [discover, setDiscover] = useState<Section[]>([]);

  useEffect(() => {
    fetchDiscover().then((e) => setDiscover(e));
  }, []);

  const categoryProducts: Product[] =
    discover.find((section: Section) => section.name === "all_categories")
      ?.products || [];

  const featured: Product[] =
    discover.find((section: Section) => section.name === "featured")
      ?.products || [];

  const conversationals: Product[] = categoryProducts
    .filter((e) => e.name === "conversational")
    .flatMap((e) => e.action.params.products || []) as Product[];

  const generateImages: Product[] = categoryProducts
    .filter((e) => e.name === "text_to_image")
    .flatMap((e) => e.action.params.products || []) as Product[];

  return (
    <div className="p-6 w-full h-full m-auto flex flex-col space-y-8 overflow-x-hidden scroll">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold mt-3 mb-4 leading-[52px] text-[40px] text-gray-400">
            AIs
          </h2>
          <AiSearch />
        </div>
        <div className="flex gap-20">
          <div className="w-[70%]">
            {featured.length > 0 && <Slider product={featured[0]} />}
          </div>
          <div className="w-[30%]">
            <AiTypeList
              conversationals={conversationals}
              generativeArts={generateImages}
            />
          </div>
        </div>
      </div>
      <ConversationalList products={conversationals} />
      <GenerateImageList products={generateImages} />
    </div>
  );
};

export default NewChatBlankState;
