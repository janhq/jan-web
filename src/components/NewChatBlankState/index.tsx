import React, { useEffect, useState } from "react";
import { AiSearch, Slider } from "@/components";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";
import { api } from "@/services/api";
import { Product, Section } from "@/models/Product";

const NewChatBlankState: React.FC = () => {
  const [discover, setDiscover] = useState({
    kind: "",
    configuration: {
      sections: [],
    },
  });

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        const result = await api.getConfigurations("discover");
        setDiscover(result);
      } catch (error) {
        console.error("Error fetching discover configuration:", error);
      }
    };

    fetchDiscover();
  }, []);

  const categoryProducts: Product[] =
    discover.kind === "ok"
      ? discover.configuration.sections.find(
          (section: Section) => section.name === "all_categories"
        )?.products || []
      : [];

  const featured: Product[] =
    discover.kind === "ok"
      ? discover.configuration.sections.find(
          (section: Section) => section.name === "featured"
        )?.products || []
      : [];

  const conversationals: Product[] = categoryProducts
    .filter((e) => e.name === "conversational")
    .flatMap((e) => e.action.params.products || []) as Product[];

  const generateImages: Product[] = categoryProducts
    .filter((e) => e.name === "text_to_image")
    .flatMap((e) => e.action.params.products || []) as Product[];

  return (
    <main className="p-6 w-full m-auto flex flex-col space-y-8 overflow-x-hidden">
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
      <Footer />
    </main>
  );
};

export default NewChatBlankState;
