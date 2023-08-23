import { ProductV2 } from "@/_models/ProductV2";

const fetchProducts = async (): Promise<ProductV2[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`);

  if (!res.ok) {
    console.error("Error fetching products");
    return [];
  }

  const products = (await res.json()).data;

  return products;
};

export { fetchProducts };
