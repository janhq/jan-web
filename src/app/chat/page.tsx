import React from "react";
import { api } from "@/services/api";
import ChatContainer from "@/components/ChatContainer";
import { Product, Section } from "@/models/Product";

const Page = async ({}) => {
  const shortcutsData = await api.getConfigurations("shortcuts");
  const shortcuts: Product[] =
    shortcutsData.kind === "ok" ? shortcutsData.configuration.products : [];

  const discover = await api.getConfigurations("discover");

  const categoryProducts: Product[] =
    discover.kind === "ok"
      ? discover.configuration?.sections?.find(
          (section: Section) => section.name === "all_categories"
        )?.products
      : [];
  const products: Product[] =
    categoryProducts
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];
  return <ChatContainer shortcuts={shortcuts} products={products} />;
};

export default Page;
