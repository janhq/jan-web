import { ProductV2 } from "@/_models/ProductV2";
import { fetchCollections } from "@/_services/products";
import { useEffect, useState } from "react";

export default function useGetCollections() {
  const [llmProducts, setLlmProducts] = useState<ProductV2[]>([]);
  const [imageGenProducts, setImageGenProducts] = useState<ProductV2[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<ProductV2[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // hardcoded for now
  const featuredSlugs = ["airoboros", "cyber-realistic", "xrica-mix"];

  const fetchAllCollections = async () => {
    setIsLoading(true);
    try {
      const collections = await fetchCollections();

      const llms: ProductV2[] = [];
      const images: ProductV2[] = [];
      const featured: ProductV2[] = [];

      collections.forEach((collection) => {
        const products = collection.products.filter(
          (product) => featuredSlugs.indexOf(product.slug) !== -1
        );
        featured.push(...products);
        if (collection.slug === "conversational") {
          llms.push(...collection.products);
        } else if (collection.slug === "text-to-image") {
          images.push(...collection.products);
        } else {
          console.error("Unknown collection slug: ", collection.slug);
        }
      });

      setLlmProducts(llms);
      setImageGenProducts(images);
      setFeaturedProducts(featured);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCollections();
  }, []);

  return {
    isLoading,
    llmProducts,
    imageGenProducts,
    featuredProducts,
  };
}
