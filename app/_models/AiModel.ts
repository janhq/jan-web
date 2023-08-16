import { types } from "mobx-state-tree";

export enum AiModelType {
  LLM = "LLM",
  GenerativeArt = "GenerativeArt",
}

export const PromptModel = types.model("Prompt", {
  id: types.number,
  createdAt: types.string,
  updatedAt: types.maybeNull(types.string),
  deletedAt: types.maybeNull(types.string),
  slug: types.string,
  content: types.string,
  imageUrl: types.maybeNull(types.string),
});

export const AiModel = types.model("AiModel", {
  name: types.string,
  modelId: types.string,
  title: types.string,
  aiModelType: types.enumeration(Object.values(AiModelType)),
  description: types.maybeNull(types.string),
  avatarUrl: types.maybeNull(types.string),
  modelVersion: types.maybeNull(types.string),
  modelUrl: types.maybeNull(types.string),
  modelDescription: types.maybeNull(types.string),
  defaultPrompts: types.array(PromptModel),
});
