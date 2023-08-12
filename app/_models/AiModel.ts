import { types } from "mobx-state-tree";

export enum AiModelType {
  LLM = "LLM",
  GenerativeArt = "GenerativeArt",
}

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
  defaultPrompts: types.optional(types.array(types.string), []),
});
