import { types } from "mobx-state-tree";
import { Product } from "./AiModel";

export const AiModelList = types
  .model("AiModelList", {
    modelList: types.array(Product),
  })
  .actions((self) => ({
    getAiModelByName(name: string) {
      return self.modelList.find((model) => model.name === name);
    },

    fetchModels() {},
  }));
