"use client";
import { useState, useEffect } from "react";
import { ChatBody } from "@/components/ChatBody";
import { InputToolbar } from "@/components/InputToolbar";
import { UserToolbar } from "@/components/UserToolbar";
import ModelMenu from "@/components/ModelMenu";
import { useStore } from "../../models/RootStore";
import { observer } from "mobx-react-lite";
import Gleap from "gleap";
import ConfirmDeleteConversationModal from "../ConfirmDeleteConversationModal";
import { ModelDetailSideBar } from "../ModelDetailSideBar";
import NewChatBlankState from "../NewChatBlankState";
import { ProductsProps } from "@/services/products";
import { useAuth } from "@/contexts/authContext";

const ChatContainer: React.FC<ProductsProps> = observer((props) => {
  const [prefillPrompt, setPrefillPrompt] = useState("");
  const { historyStore } = useStore();
  const { isReady, currentUser } = useAuth();
  const showBodyChat = historyStore.activeConversationId != null;

  const conversation = historyStore.getActiveConversation();

  useEffect(() => {
    if (isReady && !currentUser) {
      historyStore.clearAllConversations();
    }
  }, [isReady, currentUser, historyStore]);

  // Hide Feedback Button
  useEffect(() => {
    if (conversation) {
      Gleap.showFeedbackButton(false);
    } else {
      Gleap.showFeedbackButton(true);
    }
  }, [conversation]);

  const [open, setOpen] = useState(false);

  const onConfirmDelete = () => {
    setPrefillPrompt("");
    historyStore.closeModelDetail();
    historyStore.deleteActiveConversation();
    setOpen(false);
  };

  const onSuggestPromptClick = (prompt: string) => {
    if (prompt !== prefillPrompt) {
      setPrefillPrompt(prompt);
    }
  };

  return (
    <div className="flex flex-1 h-full overflow-y-hidden">
      <ConfirmDeleteConversationModal
        open={open}
        setOpen={setOpen}
        onConfirmDelete={onConfirmDelete}
      />
      {showBodyChat ? (
        <div className="flex-1 flex flex-col w-full">
          <div className="flex w-full px-3 py-1 border-b border-gray-200 bg-white shadow-sm sm:px-3 lg:px-3">
            <div
              className="h-full w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex justify-between self-stretch flex-1">
              <UserToolbar />
              <ModelMenu
                onDeleteClick={() => setOpen(true)}
                onCreateConvClick={() => {}}
              />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex flex-col h-full px-1 sm:px-2 lg:px-3">
              <ChatBody />
              <InputToolbar prefillPrompt={prefillPrompt} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          <NewChatBlankState />
        </div>
      )}

      <ModelDetailSideBar onPromptClick={onSuggestPromptClick} />
    </div>
  );
});

export default ChatContainer;
