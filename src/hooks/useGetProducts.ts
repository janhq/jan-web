import { useState } from "react";
import { api } from "../services/api";
import { Product, Section } from "../models/Product";

export const useGetProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [conversationalsProducts, setConversationalsProducts] =
    useState<Product[]>([]);
  const [generateImagesProducts, setGenerateImagesProducts] =
    useState<Product[]>([]);

  const fetchProducts = async () => {
    const discover = await api.getConfigurations("discover");

    const categoryProducts: Product[] =
      discover.kind === "ok"
        ? discover.configuration?.sections?.find(
            (section: Section) => section.name === "all_categories"
          )?.products
        : [];

    const featured: Product[] =
      discover.kind === "ok"
        ? discover.configuration?.sections?.find(
            (section: Section) => section.name === "featured"
          )?.products
        : [];

    const conversationals: Product[] =
      categoryProducts
        ?.filter((e) => e.name === "conversational")
        .flatMap((e) => e.action.params.products)
        .filter((e): e is Product => !!e) || [];

    const generateImages: Product[] =
      categoryProducts
        ?.filter((e) => e.name === "text_to_image")
        .flatMap((e) => e.action.params.products)
        .filter((e): e is Product => !!e) || [];

    setFeaturedProducts(featured);
    setConversationalsProducts(conversationals);
    setGenerateImagesProducts(generateImages);
  };

  return {
    fetchProducts,
    featuredProducts,
    conversationalsProducts,
    generateImagesProducts,
  };
};
