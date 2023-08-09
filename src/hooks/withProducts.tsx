"use client";
import { Product, Section } from "@/models/Product";
import { api } from "@/services/api";
import React, { useEffect, useState } from "react";

export interface ProductsProps {
  products?: Product[];
  shortcuts?: Product[];
  categories?: {
    featured: Product[];
    conversationals: Product[];
    generativeArts: Product[];
  };
}

export function withProducts<P extends ProductsProps>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent: React.FC<P> = (props) => {
    const [shortcuts, setShortcuts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [featured, setFeatured] = useState<Product[]>([]);
    const [conversationals, setConversationals] = useState<Product[]>([]);
    const [generativeArts, setGenerativeArts] = useState<Product[]>([]);

    const fetchProducts = async () => {
      const shortcutsData = await api.getConfigurations("shortcuts");

      setShortcuts(
        shortcutsData.kind === "ok" ? shortcutsData.configuration.products : []
      );

      const discover = await api.getConfigurations("discover");
      const categoryProducts: Product[] =
        discover.kind === "ok"
          ? discover.configuration?.sections?.find(
              (section: Section) => section.name === "all_categories"
            )?.products
          : [];

      const allProducts: Product[] =
        categoryProducts
          .flatMap((e) => e.action.params.products)
          .filter((e): e is Product => !!e) || [];
      setProducts(allProducts);

      const featured: Product[] =
        discover.kind === "ok"
          ? discover.configuration?.sections?.find(
              (section: Section) => section.name === "featured"
            )?.products
          : [];
      setFeatured(featured);

      const conversationals: Product[] =
        categoryProducts
          ?.filter((e) => e.name === "conversational")
          .flatMap((e) => e.action.params.products)
          .filter((e): e is Product => !!e) || [];

      setConversationals(conversationals);

      const generateImages: Product[] =
        categoryProducts
          ?.filter((e) => e.name === "text_to_image")
          .flatMap((e) => e.action.params.products)
          .filter((e): e is Product => !!e) || [];

      setGenerativeArts(generateImages);
    };

    useEffect(() => {
      fetchProducts();
    }, []);
    return (
      <Component
        {...props}
        shortcuts={shortcuts}
        products={products}
        categories={{
          featured,
          conversationals,
          generativeArts,
        }}
      />
    );
  };
  return WrappedComponent;
}
