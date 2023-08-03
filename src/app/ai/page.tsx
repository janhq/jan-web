"use client";
import { AiSearch, Slider } from "@/components";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useEffect } from "react";

const AiPage: React.FC = () => {
  const {
    fetchProducts,
    featuredProducts,
    conversationalsProducts,
    generateImagesProducts,
  } = useGetProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (featuredProducts.length === 0) return null;

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
              conversationals={conversationalsProducts}
              generativeArts={generateImagesProducts}
            />
          </div>
        </div>
      </div>
      <ConversationalList products={conversationalsProducts} />
      <GenerateImageList products={generateImagesProducts} />
      <Footer />
    </main>
  );
};

export default AiPage;
