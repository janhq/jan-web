"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ChatBody } from "@/components/ChatBody";
import { InputToolbar } from "@/components/InputToolbar";
import { UserToolbar } from "@/components/UserToolbar";
import ShortcutList from "@/components/ShortcutList";
import HistoryList from "@/components/HistoryList";
import SearchBar from "@/components/SearchBar";
import ModelMenu from "@/components/ModelMenu";
import ModelDetail from "@/components/ModelDetail";
import { Product } from "@/models/Product";
import MobileDownload from "@/components/MobileDownload";
import { useStore } from "../../models/RootStore";
import { ChatBlankState } from "@/components/ChatBlankState";
import { observer } from "mobx-react-lite";
import { HistoryEmpty } from "../HistoryEmpty";
import Gleap from "gleap";
import ConfirmDeleteConversationModal from "../ConfirmDeleteConversationModal";
import { RemoteConfigKeys, useRemoteConfig } from "@/hooks/useRemoteConfig";
import { useRouter, useSearchParams } from "next/navigation";
import useCreateConversation from "@/hooks/useCreateConversation";

interface IChatContainerProps {
  products: Product[];
}

const ChatContainer: React.FC<IChatContainerProps> = observer((props) => {
  const params = useSearchParams();
  const router = useRouter();
  const newConvProductName = params.get("productName");

  const ref = useRef<HTMLDivElement>(null);
  const [prefillPrompt, setPrefillPrompt] = useState("");
  const { historyStore } = useStore();
  const { requestCreateConvo } = useCreateConversation();

  const showBodyChat = historyStore.activeConversationId != null;
  const showHistoryList = historyStore.conversations.length > 0;
  const [heightNav, setHeightNav] = useState(0);
  const [heightChat, setHeightChat] = useState(0);
  const { getConfig } = useRemoteConfig();

  const products = getConfig(RemoteConfigKeys.ENABLE_OFFLINE_MODEL)
    ? props.products
    : props.products.filter(
        (e) => e.action?.params?.models[0]?.offline !== true
      );

  const conversation = historyStore.getActiveConversation();

  useEffect(() => {
    if (conversation) {
      Gleap.showFeedbackButton(false);
    } else {
      Gleap.showFeedbackButton(true);
    }
  }, [conversation]);

  useEffect(() => {
    const createConversationAndActive = async () => {
      if (newConvProductName && newConvProductName !== "") {
        const product = products.find((e) => e.name === newConvProductName);
        if (product) {
          await requestCreateConvo(product);
          router.replace("/chat", undefined);
        }
      }
    };
    createConversationAndActive();
  }, [newConvProductName, products, requestCreateConvo, router]);

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

  useLayoutEffect(() => {
    setHeightNav(ref.current?.offsetHeight ?? 0);
  }, [showHistoryList]);

  return (
    <div className="flex flex-row flex-1 w-full overflow-y-hidden">
      {/* Sidebar */}
      <div className="flex w-72 flex-col gap-y-2 border-r border-gray-200 px-2">
        <div className="flex flex-col h-16 shrink-0 items-center gap-[10px] pt-1">
          <SearchBar />
        </div>
        <div
          className="flex-1 w-full h-full flex flex-col overflow-x-hidden overflow-y-scroll scroll"
          ref={ref}
          style={heightNav > 0 ? { maxHeight: `${heightNav}px` } : {}}
        >
          <ShortcutList products={products} />
          {showHistoryList ? <HistoryList /> : <HistoryEmpty />}
        </div>
        <MobileDownload />
      </div>

      {showBodyChat ? (
        <div className="flex-1 flex flex-col w-full">
          <div className="flex h-16 w-full shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex justify-between flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <UserToolbar />
              <ModelMenu onDeleteClick={() => setOpen(true)} />
            </div>
          </div>

          {/* Your content */}
          <main className="py-3 w-full h-full">
            <div className="flex flex-col h-full px-1 sm:px-2 lg:px-3">
              <ChatBody chatHeight={heightChat} />
              <InputToolbar
                callback={(value) => setHeightChat(value)}
                prefillPrompt={prefillPrompt}
              />
            </div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex flex-col w-full">
          <ChatBlankState products={products} />
        </div>
      )}
      <div className="h-auto w-auto">
        <ModelDetail onPromptClick={onSuggestPromptClick} />
      </div>

      <ConfirmDeleteConversationModal
        open={open}
        setOpen={setOpen}
        onConfirmDelete={onConfirmDelete}
      />
    </div>
  );
});

export default ChatContainer;
