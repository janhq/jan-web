import AIModelDetail from "@/screens/AIModelDetail";
import { fetchDiscoverShortcuts } from "@/services/products";

interface IModelDetailProps {
  params: { slug: string };
}

const ModelDetail: React.FC<IModelDetailProps> = async ({ params }) => {
  const props = await fetchDiscoverShortcuts();
  return <AIModelDetail slug={params.slug} {...props} />;
};

export default ModelDetail;
