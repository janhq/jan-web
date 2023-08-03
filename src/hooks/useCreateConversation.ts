import { useAuth } from "../contexts/auth_context";
import { Product } from "../models/Product";
import { useStore } from "../models/RootStore";
import { DefaultUser } from "../models/User";

const useCreateConversation = () => {
  const { historyStore } = useStore();
  const { currentUser } = useAuth();

  const requestCreateConvo = (product: Product) => {
    const modelId = product.action.params.models[0].name;
    if (!modelId) {
      console.error("No model id found");
      return;
    }

    // search if any fresh convo with particular product id
    const convo = historyStore.conversations.find(
      (convo) => convo.isFresh && convo.aiModel.modelId === modelId
    );

    if (convo) {
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
