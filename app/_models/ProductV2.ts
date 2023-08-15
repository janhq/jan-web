// Should change name to Product after we remove the old one

import { AiModelType } from "./AiModel";

export interface Collection {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string | undefined;
  DeletedAt: string | undefined;
  slug: CollectionType;
  name: string;
  description: string;
  products: ProductV2[];
}

export interface ProductV2 {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string | undefined;
  DeletedAt: string | undefined;
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
  modelType: AiModelType.LLM; // TODO: hardcoded for now
}

export interface Prompt {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string | undefined;
  DeletedAt: string | undefined;
  slug: string;

  content: string;
  image_url: string;
  products: ProductV2[] | undefined;
}

export type CollectionType = "conversational" | "text-to-image";
