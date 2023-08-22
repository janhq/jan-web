import { Instance, cast } from "mobx-state-tree";
import { useStore } from "../_models/RootStore";
import { AiModel, AiModelType } from "../_models/AiModel";
import { Conversation } from "../_models/Conversation";
import { DefaultUser, User } from "../_models/User";
import { fetchProducts } from "@/_services/products";
import { useAuth } from "@/_contexts/authContext";
import { fetchConversations } from "@/_services/conversations";

const useGetUserConversations = () => {
  const { historyStore } = useStore();
  const { currentUser } = useAuth();

  const getUserConversations = async () => {
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    const token = await currentUser.getIdToken();
    const convos = await fetchConversations(token);
    if (!convos || convos.length === 0) {
      return;
    }

    // getting ai models
    const products = await fetchProducts();
    if (!products || products.length === 0) {
      return;
    }

    const aiModels: Instance<typeof AiModel>[] = [];
    products.forEach((product) => {
      let modelType: AiModelType | undefined = undefined;
      if (product.inputs.slug === "llm") {
        modelType = AiModelType.LLM;
      } else if (product.inputs.slug === "sd") {
        modelType = AiModelType.GenerativeArt;
      } else if (product.inputs.slug === "controlnet") {
        modelType = AiModelType.ControlNet;
      } else {
        console.error("Model type not supported");
        return;
      }

      const model: Instance<typeof AiModel> = {
        name: product.name,
        modelId: product.slug,
        aiModelType: modelType,
        description: product.description,
        avatarUrl: product.image_url,
        modelVersion: product.version,
        modelUrl: product.source_url,
        modelDescription: product.technical_description,
        input: null,
        output: null,
      };
      aiModels.push(model);
    });

    const finalConvo: Instance<typeof Conversation>[] = [];
    // TODO: should ask backend to sort this
    convos.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    // mapping
    convos.forEach((convo) => {
      const modelId = convo.ai_model;
      const correspondingAiModel = aiModels.find(
        (model) => model.modelId === modelId
      );

      if (correspondingAiModel) {
        const user: Instance<typeof User> = {
          id: currentUser.uid,
          displayName: currentUser.displayName ?? DefaultUser.displayName,
          avatarUrl: currentUser.photoURL ?? DefaultUser.avatarUrl,
        };

        const conversation = Conversation.create({
          id: convo.id!!,
          aiModel: correspondingAiModel,
          chatMessages: [],
          user: user,
          createdAt: new Date(convo.created_at).getTime(),
          updatedAt: new Date(convo.updated_at).getTime(),
          lastImageUrl: convo.last_image_url,
          lastTextMessage: convo.last_text_message,
        });

        finalConvo.push(conversation);
      }
    });

    historyStore.setConversations(finalConvo);
  };

  return {
    getUserConversations,
  };
};

export default useGetUserConversations;
