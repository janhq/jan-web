import { Product, Section } from "@/models/Product";
import { AIModelDetail } from "@/screens/AIModelDetail";
import { api } from "@/services/api";

interface IModelDetailProps {
  params: { slug: string };
}

const ModelDetail: React.FC<IModelDetailProps> = async ({ params }) => {

  const discover = await api.getConfigurations("discover");
  const categoryProducts: Product[] =
    discover.kind === "ok"
      ? discover.configuration?.sections?.find(
          (section: Section) => section.name === "all_categories"
        )?.products
      : [];

  const product: Product =
    categoryProducts
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => e?.name === params.slug)[0] || {};

  return <AIModelDetail product={product} />;
};

export default ModelDetail;
