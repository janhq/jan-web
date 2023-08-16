// Should change name to Product after we remove the old one
import { AiModelType } from "./AiModel";

export interface Collection {
  id: number;
  created_at: string;
  updated_at: string | undefined;
  deleted_at: string | undefined;
  slug: CollectionType;
  name: string;
  description: string;
  products: ProductV2[];
}

export interface ProductV2 {
  id: number;
  created_at: string;
  updated_at: string | undefined;
  deleted_at: string | undefined;
  slug: string;

  name: string;
  nsfw: boolean;
  image_url: string;
  description: string;
  long_description: string;

  technical_description: string;
  author: string;
  version: string;
  source_url: string;
  collections: Collection[];

  prompts: Prompt[] | undefined;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  greeting: string;
  modelType: AiModelType;
}

export interface Prompt {
  id: number;
  created_at: string;
  updated_at: string | undefined;
  deleted_at: string | undefined;
  slug: string;

  content: string;
  image_url: string | undefined;
  products: ProductV2[] | undefined;
}

export type CollectionType = "conversational" | "text-to-image";
