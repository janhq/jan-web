import { Collection, ProductV2 } from "@/_models/ProductV2";

const fetchCollections = async (): Promise<Collection[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEW_API_URL}collections`);

  if (!res.ok) {
    console.error("Error fetching collections");
    return [];
  }

  const collections = (await res.json()).data;

  return collections;
};

const fetchProducts = async (): Promise<ProductV2[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEW_API_URL}products`);

  if (!res.ok) {
    console.error("Error fetching products");
    return [];
  }
  
  const products = (await res.json()).data;

  return products;
};

export { fetchCollections, fetchProducts };
