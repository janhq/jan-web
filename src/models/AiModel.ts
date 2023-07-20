import { types } from "mobx-state-tree";

export enum AiModelType {
  LLM = "LLM",
  GenerativeArt = "GenerativeArt",
}

export const AiModel = types.model("AiModel", {
  name: types.string,
  aiModelType: types.enumeration(Object.values(AiModelType)),
  description: types.optional(types.string, ""),
  avatarUrl: types.optional(types.string, ""),
  modelVersion: types.optional(types.string, ""),

  modelUrl: types.maybe(types.string),
  defaultPrompts: types.optional(types.array(types.string), []),
});
