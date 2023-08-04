import { Instance, cast } from "mobx-state-tree";
import { Product, Section } from "../models/Product";
import { useStore } from "../models/RootStore";
import { api } from "../services/api";
import { AiModel, AiModelType } from "../models/AiModel";
import { Conversation } from "../models/Conversation";
import { DefaultUser, User } from "../models/User";
import { User as FirebaseUser } from "firebase/auth";

const useGetUserConversations = () => {
  const { historyStore } = useStore();

  const getProducts = async (): Promise<Product[]> => {
    const discover = await api.getConfigurations("discover");
    const categoryProducts: Product[] =
      discover.kind === "ok"
        ? discover.configuration?.sections?.find(
            (section: Section) => section.name === "all_categories"
          )?.products
        : [];
    const childProducts: Product[] = [];
    categoryProducts.forEach((product) => {
      if (product.action.params.products) {
        childProducts.push(...product.action.params.products);
      }
    });
    return childProducts;
  };

  const getUserConversations = async (firebaseUser: FirebaseUser) => {
    const convoResult = await api.getConversations();
    if (convoResult.kind !== "ok") {
      console.error("Error getting user conversations", convoResult);
      return;
    }

    // getting ai models
    const products = await getProducts();
    if (!products) {
      return;
    }

    const aiModels: Instance<typeof AiModel>[] = [];
    products.forEach((product) => {
      const textPrompts: string[] = [];
      product.action.params.suggestedPrompts?.map((p) => {
        if (typeof p === "string") {
          textPrompts.push(p);
        }
      });

      let modelType = AiModelType.LLM;
      if (product.decoration.tags?.includes("Awesome Art")) {
        modelType = AiModelType.GenerativeArt;
      }

      const modelId = product.action.params.models[0].name;
      if (!modelId) {
        console.error("No model id found");
        return;
      }

      const aiModel: Instance<typeof AiModel> = {
        name: product.name,
        modelId: modelId,
        title: product.decoration.title,
        aiModelType: modelType,
        description: product.decoration.technicalDescription,
        modelUrl: product.decoration.technicalURL,
        modelVersion: product.decoration.technicalVersion,
        avatarUrl: product.decoration.images[0],
        defaultPrompts: cast(textPrompts),
      };
      aiModels.push(aiModel);
    });

    const finalConvo: Instance<typeof Conversation>[] = [];

    // mapping
    convoResult.conversations.forEach((convo) => {
      const modelId = convo.ai_model;
      const correspondingAiModel = aiModels.find(
        (model) => model.modelId === modelId
      );

      if (correspondingAiModel) {
        const user: Instance<typeof User> = {
          id: firebaseUser?.uid ?? DefaultUser.id,
          displayName: firebaseUser?.displayName ?? DefaultUser.displayName,
          avatarUrl: firebaseUser?.photoURL ?? DefaultUser.avatarUrl,
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
