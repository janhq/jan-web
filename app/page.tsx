import React from "react";
import { Metadata } from "next";
import { fetchDiscoverShortcuts } from "@/_services/products";
import ChatPage from "@/_screens/Chat";

export const metadata: Metadata = {
  title: "Free AI Chat with Open AI Chat GPT and other models - Jan.ai",
  description:
    "Free AI chat website with many open source AI models allows you to choose different bots to converse with.",
};

const fetchServerSideProducts = async () => {
  "use server";
  return fetchDiscoverShortcuts();
};
const Page = async ({}) => {
  const props = await fetchServerSideProducts();
  return <ChatPage {...props} />;
};

export default Page;
