"use client";
import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ShortcutList from "../ShortcutList";
import HistoryList from "../HistoryList";
import HistoryEmpty from "../HistoryEmpty";
import { observer } from "mobx-react-lite";
import { useStore } from "@/_models/RootStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../_contexts/authContext";
import useGetUserConversations from "@/_hooks/useGetUserConversations";
import DiscordContainer from "../DiscordContainer";
import useGetCollections from "@/_hooks/useGetCollections";

export const SidebarLeft: React.FC = observer(() => {
  const router = usePathname();
  const [searchText, setSearchText] = useState("");
  const { isReady, currentUser } = useAuth();
  const { getUserConversations } = useGetUserConversations();

  const { historyStore } = useStore();
  const navigation = ["pricing", "docs", "about"];
  const { featuredProducts } = useGetCollections();

  const checkRouter = () =>
    navigation.map((item) => router.includes(item)).includes(true);

  useEffect(() => {
    if (isReady && currentUser && historyStore.conversations.length === 0) {
      const createConversationAndActive = async () => {
        await getUserConversations(currentUser);
      };
      createConversationAndActive();
    }
  }, [currentUser, isReady, historyStore, getUserConversations]);

  const showHistoryList = historyStore.conversations.length > 0;

  const onLogoClick = useCallback(() => {
    historyStore.clearActiveConversationId();
  }, []);

  const onSearching = (text: string) => {
    setSearchText(text);
  };

  return (
    <div
      className={`${
        historyStore.showAdvancedPrompt ? "lg:hidden" : "lg:flex"
      } ${
        checkRouter() ? "lg:hidden" : "lg:block"
      } hidden lg:inset-y-0 lg:w-72 lg:flex-col flex-shrink-0 overflow-hidden border-r border-gray-200 dark:bg-gray-800`}
    >
      <div className="h-full flex grow flex-col overflow-hidden">
        <button className="p-3 flex gap-3" onClick={onLogoClick}>
          <div className="flex gap-[2px] items-center">
            <Image src={"/icons/app_icon.svg"} width={28} height={28} alt="" />
            <Image src={"/icons/Jan.svg"} width={27} height={12} alt="" />
          </div>
        </button>
        <div className="flex flex-col gap-3 overflow-x-hidden h-full">
          <div className="flex items-center px-3">
            <SearchBar onTextChanged={onSearching} />
          </div>
          <div className="flex flex-col h-full overflow-x-hidden scroll gap-3">
            <ShortcutList
              products={
                featuredProducts?.filter(
                  (e) =>
                    searchText === "" ||
                    e.name.toLowerCase().includes(searchText.toLowerCase())
                ) || []
              }
            />
            {showHistoryList ? (
              <HistoryList searchText={searchText} />
            ) : (
              <HistoryEmpty />
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <DiscordContainer />
      </div>
    </div>
  );
});
