export interface Product {
  name: string;
  action: ProductAction;
  decoration: ProductDecoration;
  navigation: Record<string, unknown>;
  rightIcon?: string;
}

export interface ProductAction {
  name: string;
  params: ProductActionParam;
  defaultPrompt?: any;
  welcomeMessage: string;
  suggestedPrompts: string[];
}

export interface ProductActionParam {
  name?: string; // chat | category
  models: ActionParamModel[];
  welcomeMessage?: string;
  defaultPrompt?: string;
  suggestedPrompts?: ProductDecorationSample[];

  // Category in Category
  products?: Product[]; // nested products in product
  // Nested Category Decoration
  header?: ProductCategoryDecorationHeader;
}

export interface ActionParamModel {
  name: string;
  nsfw: boolean;
  image: string;
  title: string;
  source: string;

  category: string;
  description: string;
  input_types: string[];
  offline: boolean;
  download_url: string;
}

export interface ProductDecoration {
  tags: string[];
  color: string;
  title: string;
  images: string[];
  samples: ProductDecorationSample[];

  description: string;
  technicalURL: string;
  backgroundImage: string;
  technicalVersion: string;
  technicalDescription: string;

  additionalDescription: string;
  icon?: string;
  subTitle?: string;
  video?: string;
}

export interface ProductCategoryDecorationHeader {
  title?: string | undefined;
  description?: string | undefined;
  icon?: string | undefined;
  color?: string | undefined;
}

export interface ProductDecorationSample {
  image: string;
  prompt: string;
}

export enum ProductActionType {
  CHAT = "chat",
  CATEGORY = "",
}
