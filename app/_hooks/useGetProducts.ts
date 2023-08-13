import { useState } from "react";
import { Product, Section } from "@/_models/Product";
import { fetchDiscoverShortcuts } from "@/_services/products";
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
    const data = await fetchDiscoverShortcuts();

    setCategoryProducts(data.products || []);
    setFeaturedProducts(data.categories?.featured || []);
    setConversationalProducts(data.categories?.conversationals || []);
    setGenerateImageProducts(data.categories?.generativeArts || []);
  };

  return {
    fetchConfigurations,
    categoryProducts,
    featuredProducts,
    conversationalProducts,
    generateImageProducts,
  };
}
