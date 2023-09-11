import {
  activeConversationIdAtom,
  currentPromptAtom,
  showingAdvancedPromptAtom,
  showingProductDetailAtom,
  userConversationsAtom,
} from "@/_helpers/JotaiWrapper";
import {
  DeleteConversationDocument,
  DeleteConversationMutation,
} from "@/graphql";
import { useMutation } from "@apollo/client";
import { useAtom, useSetAtom } from "jotai";

export default function useDeleteConversation() {
  const [userConversations, setUserConversations] = useAtom(
    userConversationsAtom
  );
  const setCurrentPrompt = useSetAtom(currentPromptAtom);
  const setShowingProductDetail = useSetAtom(showingProductDetailAtom);
  const setShowingAdvancedPrompt = useSetAtom(showingAdvancedPromptAtom);
  const [activeConversationId, setActiveConversationId] = useAtom(
    activeConversationIdAtom
  );

  const [deleteConversation] = useMutation<DeleteConversationMutation>(
    DeleteConversationDocument
  );

  const deleteConvo = async () => {
    if (activeConversationId) {
      try {
        await deleteConversation({ variables: { id: activeConversationId } });
        setUserConversations(
          userConversations.filter((c) => c.id !== activeConversationId)
        );
        setActiveConversationId(undefined);
        setCurrentPrompt("");
        setShowingProductDetail(false);
        setShowingAdvancedPrompt(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return {
    deleteConvo,
  };
}
