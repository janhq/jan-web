"use client";

import { AiSearch, Slider } from "@/components";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";
import useGetProducts from "../../hooks/useGetProducts";
import React, { useEffect } from "react";

const AiPage: React.FC = () => {
  const {
    fetchConfigurations,
    featuredProducts,
    conversationalProducts,
    generateImageProducts,
  } = useGetProducts();

  useEffect(() => {
    fetchConfigurations();
  }, []);

  return (
    <main className="container m-auto flex flex-col space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold mt-3 mb-4 leading-[52px] text-[40px] text-gray-400">
            AIs
          </h2>
          <AiSearch />
        </div>
        <div className="flex gap-20">
          <div className="w-[70%]">
            <Slider product={featuredProducts[0]} />
          </div>
          <div className="w-[30%]">
            <AiTypeList
              conversationals={conversationalProducts}
              generativeArts={generateImageProducts}
            />
          </div>
        </div>
      </div>
      <ConversationalList products={conversationalProducts} />
      <GenerateImageList products={generateImageProducts} />
      <Footer />
    </main>
  );
};

export default AiPage;
