import React from "react";
import Slider from "../Slider";
import ConversationalList from "../ConversationalList";
import GenerateImageList from "../GenerateImageList";
import useGetCollections from "@/_hooks/useGetCollections";

const NewChatBlankState: React.FC = () => {
  const { isLoading, llmProducts, imageGenProducts, featuredProducts } =
    useGetCollections();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="px-6 pt-8 w-full h-full overflow-y-scroll scroll">
      {featuredProducts.length > 0 && <Slider products={featuredProducts} />}
      <ConversationalList products={llmProducts} />
      <GenerateImageList products={imageGenProducts} />
    </div>
  );
};

export default NewChatBlankState;
