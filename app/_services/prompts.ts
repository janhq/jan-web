import { Prompt } from "@/_models/ProductV2";

export const fetchPrompts = async (slug: string): Promise<Prompt[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}collections`);

  if (!res.ok) {
    console.error("Error fetching collections");
    return [];
  }

  const collections = (await res.json()).data;

  return collections;
};
