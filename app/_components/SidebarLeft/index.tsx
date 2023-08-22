"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ShortcutList from "../ShortcutList";
import HistoryList from "../HistoryList";
import HistoryEmpty from "../HistoryEmpty";
import { useRemoteConfig, RemoteConfigKeys } from "@/_hooks/useRemoteConfig";
import { Product } from "@/_models/Product";
import { observer } from "mobx-react-lite";
import { useStore } from "@/_models/RootStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { fetchShortcuts } from "@/_services/products";
import useGetUserConversations from "@/_hooks/useGetUserConversations";
import DiscordContainer from "../DiscordContainer";
import useGetCurrentUser from "@/_hooks/useGetCurrentUser";

export const SidebarLeft: React.FC = observer(() => {
  const router = usePathname();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchText, setSearchText] = useState("");
  const { user } = useGetCurrentUser();
  const { getUserConversations } = useGetUserConversations();

  const { historyStore } = useStore();
  const navigation = ["pricing", "docs", "about"];

  const checkRouter = () => {
    const checked = navigation.map((item) => router.includes(item));
    return checked.includes(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      const shortcuts = await fetchShortcuts();
      setProducts(shortcuts);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (user) {
      const createConversationAndActive = async () => {
        await getUserConversations(user);
      };
      createConversationAndActive();
    }
  }, [user]);

  const showHistoryList = historyStore.conversations.length > 0;
  const { getConfig } = useRemoteConfig();
  const productsMain = getConfig(RemoteConfigKeys.ENABLE_OFFLINE_MODEL)
    ? products
    : products?.filter((e) => e.action?.params?.models[0]?.offline !== true);

  const onLogoClick = () => {
    historyStore.clearActiveConversationId();
  };
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
                productsMain?.filter(
                  (e) =>
                    searchText === "" ||
                    e.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    e.decoration.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
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
