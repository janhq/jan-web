import { Prompt } from "@/_models/ProductV2";
import { fetchPrompts } from "@/_services/prompts";
import { useEffect, useState } from "react";

export default function useGetPrompts(slug: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProductPrompts = async (slug: string) => {
    setIsLoading(true);
    try {
      const promptArray = await fetchPrompts(slug);

      setPrompts(promptArray);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductPrompts(slug);
  }, [slug]);

  return {
    isLoading,
    prompts,
  };
}
