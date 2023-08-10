import React, { useEffect } from "react";
import { Slider } from "@/components";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import useGetProducts from "../../hooks/useGetProducts";

const NewChatBlankState: React.FC = () => {
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
    <div className="px-6 pt-8 w-full h-full">
      {featuredProducts.length > 0 && <Slider product={featuredProducts[0]} />}
      <ConversationalList products={conversationalProducts} />
      <GenerateImageList products={generateImageProducts} />
    </div>
  );
};

export default NewChatBlankState;
