import { Product } from "@/models/Product";
import AIModelDetail from "@/screens/AIModelDetail";
import { fetchDiscoverShortcuts } from "@/services/products";
import { Metadata, ResolvingMetadata } from "next";

interface IModelDetailProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: IModelDetailProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  const data = await fetchDiscoverShortcuts();

  // fetch data
  const product = data.products?.find((e) => e.name === slug);

  return {
    title: `${product?.decoration?.title || "Stable Diffusion"} - Generate Free AI Art Image - Jan.ai`,
    description:
      product?.decoration?.description ||
      "Generate AI art and images for free. Access many open source AI models through an easy to use interface. Create unique AI images in seconds.",
    openGraph: {
      images: [product?.decoration?.images[0] || ""],
    },
  };
}

const ModelDetail: React.FC<IModelDetailProps> = async ({ params }) => {
  const props = await fetchDiscoverShortcuts();
  return <AIModelDetail slug={params.slug} {...props} />;
};

export default ModelDetail;
