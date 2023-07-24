import React from "react";
import { api } from "@/services/api";
import ChatContainer from "@/components/ChatContainer";
import { Product } from "@/models/Product";

const Page = async ({}) => {
  const shortcut = await api.getConfigurations("shortcuts");
  const products: Product[] =
    shortcut.kind === "ok" ? shortcut.configuration.products : [];
  return <ChatContainer products={products} />;
};

export default Page;
