import React, { useEffect, useState } from "react";
import AiSearch from "../AiSearch";
import Slider from "../Slider";
import AiTypeList from "../AiTypeList";
import ConversationalList from "../ConversationalList";
import GenerateImageList from "../GenerateImageList";
import Footer from "../Footer";
import { Product, Section } from "@/_models/Product";
import { fetchDiscover } from "@/_services/products";
import useGetProducts from "@/_hooks/useGetProducts";

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
    <div className="px-6 pt-8 w-full h-full overflow-y-scroll scroll">
      {featuredProducts.length > 0 && <Slider product={featuredProducts[0]} />}
      <ConversationalList products={conversationalProducts} />
      <GenerateImageList products={generateImageProducts} />
    </div>
  );
};

export default NewChatBlankState;
