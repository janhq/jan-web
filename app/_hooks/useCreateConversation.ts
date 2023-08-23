import { ProductDetailFragment } from "@/graphql";
import { useStore } from "../_models/RootStore";
import useGetCurrentUser from "./useGetCurrentUser";

const useCreateConversation = () => {
  const { historyStore } = useStore();
  const { user } = useGetCurrentUser();

  const requestCreateConvo = (
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

    // if not found, create new convo and set it as current
    historyStore.createConversation(product, user.id, user.displayName);
  };

  return {
    requestCreateConvo,
  };
};

export default useCreateConversation;
