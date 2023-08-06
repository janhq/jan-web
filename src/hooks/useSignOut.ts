import { useAuth } from "../contexts/auth_context";
import { useStore } from "../models/RootStore";

export default function useSignOut() {
  const { historyStore } = useStore();
  const { handleSignOut } = useAuth();

  const signOut = () => {
    handleSignOut()
      .then(() => {
        historyStore.clearAllConversations();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return { signOut };
}
