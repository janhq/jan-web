import { types } from "mobx-state-tree";
import { InputModel } from "./Input";
import { OutputModel } from "./Output";

export enum AiModelType {
  LLM = "LLM",
  GenerativeArt = "GenerativeArt",
  ControlNet = "ControlNet",
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
  modelId: types.string, // TODO change to slug
  name: types.string,
  aiModelType: types.enumeration(Object.values(AiModelType)),
  description: types.maybeNull(types.string),
  avatarUrl: types.maybeNull(types.string),
  modelVersion: types.maybeNull(types.string),
  modelUrl: types.maybeNull(types.string),
  modelDescription: types.maybeNull(types.string),
  input: types.maybeNull(InputModel),
  output: types.maybeNull(OutputModel),
});
