import { useAuth } from "../_contexts/authContext";
import { useStore } from "../_models/RootStore";
import { DefaultUser } from "../_models/User";
import { ProductDetailFragment } from "@/graphql";

const useCreateConversation = () => {
  const { historyStore } = useStore();
  const { currentUser, setShowLogin } = useAuth();

  const requestCreateConvo = (
    product: ProductDetailFragment,
    forceCreate: boolean = false
  ) => {
    if (!currentUser || currentUser.isAnonymous) {
      setShowLogin(true);
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
    historyStore.createConversation(
      product,
      currentUser?.uid ?? DefaultUser.id,
      currentUser?.displayName ?? DefaultUser.displayName
    );
  };

  return {
    requestCreateConvo,
  };
};

export default useCreateConversation;
