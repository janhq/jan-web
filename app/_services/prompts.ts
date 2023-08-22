import { Prompt } from "@/_models/ProductV2";

export const fetchPrompts = async (slug: string): Promise<Prompt[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}prompts/?product=${slug}`
  );

  if (!res.ok) {
    console.error("Error fetching prompts");
    return [];
  }

  const prompts = (await res.json()).data;

  return prompts;
};
