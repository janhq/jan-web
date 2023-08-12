import { Product, Section } from "@/_models/Product";

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
  const categoryProducts: Product[] =
    discover.find((section: Section) => section.name === "all_categories")
      ?.products || [];

  const products: Product[] =
    categoryProducts
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];

  const featured: Product[] =
    discover.find((section: Section) => section.name === "featured")
      ?.products || [];

  const conversationals: Product[] =
    categoryProducts
      ?.filter((e) => e.name === "conversational")
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];

  const generativeArts: Product[] =
    categoryProducts
      ?.filter((e) => e.name === "text_to_image")
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];
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
  const categoryProducts: Product[] =
    discover.find((section: Section) => section.name === "all_categories")
      ?.products || [];

  const products: Product[] =
    categoryProducts
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];

  return products;
};

export { fetchDiscoverShortcuts, fetchProducts, fetchShortcuts, fetchDiscover };
