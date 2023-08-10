import { useState } from "react";
import { Product, Section } from "../models/Product";
import { api } from "../services/api";

export default function useGetProducts() {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [conversationalProducts, setConversationalProducts] = useState<
    Product[]
  >([]);
  const [generateImageProducts, setGenerateImageProducts] = useState<Product[]>(
    []
  );

  const fetchConfigurations = async () => {
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

    setCategoryProducts(categoryProducts);
    setFeaturedProducts(featured);
    setConversationalProducts(conversationals);
    setGenerateImageProducts(generateImages);
  };

  return {
    fetchConfigurations,
    categoryProducts,
    featuredProducts,
    conversationalProducts,
    generateImageProducts,
  };
}
