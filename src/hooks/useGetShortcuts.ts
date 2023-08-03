import { useState } from "react";
import { Product } from "../models/Product";
import { api } from "../services/api";

export const useGetShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<Product[]>([]);

  const fetchShortcuts = async () => {
    const shortcut = await api.getConfigurations("shortcuts");

    const products: Product[] =
      shortcut.kind === "ok" ? shortcut.configuration.products : [];

    setShortcuts(products);
  };

  return {
    shortcuts,
    fetchShortcuts,
  };
};
