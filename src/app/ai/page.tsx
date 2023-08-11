import Footer from "@/components/Footer";
import Discover from "@/screens/Discover";
import { fetchDiscoverShortcuts } from "@/services/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create top AI Image with our Free AI Art Generator - Jan.ai",
  description:
    "Generate AI art and images for free. Access many open source AI models through an easy to use interface. Create unique AI images in seconds.",
};

const AiPage = async ({}) => {
  const props = await fetchDiscoverShortcuts();
  return (
    <main className="container m-auto flex flex-col space-y-8">
      <Discover {...props} />
      <Footer />
    </main>
  );
};

export default AiPage;
