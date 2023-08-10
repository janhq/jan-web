import Footer from "@/components/Footer";
import Discover from "@/screens/Discover";
import { fetchDiscoverShortcuts } from "@/services/products";

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
