import ChatPage from "@/screens/Chat";
import { fetchDiscoverShortcuts } from "@/services/products";

const Page = async ({}) => {
  const props = await fetchDiscoverShortcuts();
  return <ChatPage {...props} />;
};

export default Page;
