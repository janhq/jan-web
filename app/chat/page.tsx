import ChatPage from "@/_screens/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Chat with Open AI Chat GPT and other models - Jan.ai",
  description:
    "Free AI chat website with many open source AI models allows you to choose different bots to converse with.",
};

const Page = () => {
  return <ChatPage />;
};

export default Page;
