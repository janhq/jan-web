import { Instance } from "mobx-state-tree";
import { useStore } from "../_models/RootStore";
import { AiModel, AiModelType } from "../_models/AiModel";
import { Conversation } from "../_models/Conversation";
import { User } from "../_models/User";
import { fetchProducts } from "@/_services/products";
import { GetConversationsQuery, GetConversationsDocument } from "@/graphql";
import { useLazyQuery } from "@apollo/client";

const useGetUserConversations = () => {
  const { historyStore } = useStore();
  const [getConvos] = useLazyQuery<GetConversationsQuery>(
    GetConversationsDocument
  );

  const getUserConversations = async (user: Instance<typeof User>) => {
    const results = await getConvos();
    if (!results.data || results.data.conversations.length === 0) {
      return;
    }

    const convos = results.data.conversations;

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
      const product_id = convo.product_id;
      const correspondingAiModel = aiModels.find(
        (model) => model.modelId === product_id
      );

      if (correspondingAiModel) {
        const conversation = Conversation.create({
          id: convo.id!!,
          aiModel: correspondingAiModel,
          chatMessages: [],
          user: user,
          createdAt: new Date(convo.created_at).getTime(),
          updatedAt: new Date(convo.updated_at).getTime(),
          lastImageUrl: convo.last_image_url || "",
          lastTextMessage: convo.last_text_message || "",
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
