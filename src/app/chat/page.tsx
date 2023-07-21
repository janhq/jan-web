import React from "react";
import { api } from "@/services/api";
import ChatContainer from "@/components/ChatContainer";

const Page = async ({}) => {
  var products = [];
  const shortcut = await api.getConfigurations("shortcuts");
  if (shortcut.kind === "ok") {
    products = shortcut.configuration.products;
  }
  return <ChatContainer products={products} />;
};

export default Page;
