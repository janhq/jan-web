import { Instance, cast } from "mobx-state-tree";
import { useStore } from "../_models/RootStore";
import { api } from "../_services/api";
import { AiModel, AiModelType } from "../_models/AiModel";
import { Conversation } from "../_models/Conversation";
import { DefaultUser, User } from "../_models/User";
import { User as FirebaseUser } from "firebase/auth";
import { fetchProducts } from "@/_services/products";

const useGetUserConversations = () => {
  const { historyStore } = useStore();

  const getUserConversations = async (firebaseUser: FirebaseUser) => {
    const convoResult = await api.getConversations();
    if (convoResult.kind !== "ok") {
      console.error("Error getting user conversations", convoResult);
      return;
    }

    // getting ai models
    const products = await fetchProducts();
    if (!products || products.length === 0) {
      return;
    }

    const aiModels: Instance<typeof AiModel>[] = [];
    products.forEach((product) => {
      const textPrompts: string[] = [];
      product.prompts?.map((p) => {
        if (typeof p === "string") {
          textPrompts.push(p);
        }
      });

      const aiModel: Instance<typeof AiModel> = {
        name: product.name,
        modelId: product.slug,
        title: product.name,
        aiModelType: product.modelType,
        description: product.description,
        modelUrl: product.source_url,
        modelVersion: product.version,
        modelDescription:
          product.technical_description || product.long_description,
        avatarUrl: product.image_url,
        defaultPrompts: cast(textPrompts),
      };
      aiModels.push(aiModel);
    });

    const finalConvo: Instance<typeof Conversation>[] = [];
    // TODO: should ask backend to sort this
    convoResult.conversations.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
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
