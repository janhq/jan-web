import { types } from "mobx-state-tree";
import { AiModel } from "./AiModel";

export const AiModelList = types
  .model("AiModelList", {
    modelList: types.array(AiModel),
  })
  .actions((self) => ({
    getAiModelByName(name: string) {
      return self.modelList.find((model) => model.name === name);
    },

    fetchModels() {},
  }));
