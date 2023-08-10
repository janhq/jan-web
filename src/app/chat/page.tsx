import ChatContainer from "@/components/ChatContainer";
import { fetchDiscoverShortcuts } from "@/services/products";

const Page = async ({}) => {
  const props = await fetchDiscoverShortcuts();
  return <ChatContainer {...props} />;
};

export default Page;
