import {
  ProductDetailFragment,
  CreateConversationMutation,
  CreateConversationDocument,
  CreateConversationMutationVariables,
} from "@/graphql";
import { useStore } from "../_models/RootStore";
import useGetCurrentUser from "./useGetCurrentUser";
import { useMutation } from "@apollo/client";

const useCreateConversation = () => {
  const { historyStore } = useStore();
  const { user } = useGetCurrentUser();
  const [createConversation] = useMutation<CreateConversationMutation>(
    CreateConversationDocument
  );

  const requestCreateConvo = async (
    product: ProductDetailFragment,
    forceCreate: boolean = false
  ) => {
    if (!user) {
      return;
    }

    // search if any fresh convo with particular product id
    const convo = historyStore.conversations.find(
      (convo) =>
        convo.aiModel.modelId === product.slug && convo.chatMessages.length <= 1
    );

    if (convo && !forceCreate) {
      historyStore.setActiveConversationId(convo.id);
      return;
    }

    const variables: CreateConversationMutationVariables = {
      product_id: product.id,
      user_id: user.id,
    };
    const result = await createConversation({
      variables,
    });

    if (result.data?.insert_conversations_one) {
      historyStore.createConversation(
        result.data.insert_conversations_one,
        product,
        user.id,
        user.displayName
      );
    }
    // if not found, create new convo and set it as current
  };

  return {
    requestCreateConvo,
  };
};

export default useCreateConversation;
