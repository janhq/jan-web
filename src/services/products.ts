import { Product, Section } from "@/models/Product";

export interface ProductsProps {
  products?: Product[];
  shortcuts?: Product[];
  categories?: {
    featured: Product[];
    conversationals: Product[];
    generativeArts: Product[];
  };
}

const fetchDiscover = (): Promise<Section[]> => {
  return fetch(
    new URL(`configuration/discover`, process.env.NEXT_PUBLIC_API_URL),
    { cache: "force-cache" }
  )
    .then((response) => response.json())
    .then((data) => data.sections);
};

const fetchShortcuts = (): Promise<Product[]> => {
  return fetch(
    new URL(`configuration/shortcuts`, process.env.NEXT_PUBLIC_API_URL),
    { cache: "force-cache" }
  )
    .then((response) => response.json())
    .then((data) => data.products);
};

const fetchDiscoverShortcuts = async (): Promise<ProductsProps> => {
  const shortcuts: Product[] = await fetchShortcuts();
  const discover: Section[] = await fetchDiscover();
  const products: Product[] =
    discover.find((e) => e.name === "chat_gpt_alternatives")?.products || [];

  const featured: Product[] =
    discover.find((section: Section) => section.name === "featured")
      ?.products || [];

  const conversationals: Product[] =
    products.filter((e): e is Product => !!e) || [];

  const generativeArts: Product[] = [];
  return {
    products,
    shortcuts,
    categories: {
      featured,
      conversationals,
      generativeArts,
    },
  };
};

const fetchProducts = async (): Promise<Product[]> => {
  const discover: Section[] = await fetchDiscover();
  const products: Product[] =
    discover.find((e) => e.name === "chat_gpt_alternatives")?.products ?? [];

  return products;
};

export { fetchDiscoverShortcuts, fetchProducts };
