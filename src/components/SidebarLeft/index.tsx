"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ShortcutList from "../ShortcutList";
import HistoryList from "../HistoryList";
import HistoryEmpty from "../HistoryEmpty";
import { useRemoteConfig, RemoteConfigKeys } from "@/hooks/useRemoteConfig";
import { Product } from "@/models/Product";
import { observer } from "mobx-react-lite";
import { useStore } from "@/models/RootStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { fetchShortcuts } from "@/services/products";
import { useAuth } from "@/contexts/authContext";
import useGetUserConversations from "@/hooks/useGetUserConversations";

export const SidebarLeft: React.FC = observer(() => {
  const router = usePathname();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchText, setSearchText] = useState("");
  const { isReady, currentUser } = useAuth();
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
    if (isReady && currentUser && historyStore.conversations.length === 0) {
      const createConversationAndActive = async () => {
        await getUserConversations(currentUser);
      };
      createConversationAndActive();
    }
  }, [currentUser, isReady, historyStore, getUserConversations]);

  const showHistoryList = historyStore.conversations.length > 0;
  const { getConfig } = useRemoteConfig();
  const productsMain = getConfig(RemoteConfigKeys.ENABLE_OFFLINE_MODEL)
    ? products
    : products?.filter((e) => e.action?.params?.models[0]?.offline !== true);

  const onSearching = (text: string) => {
    setSearchText(text);
  };

  return (
    <div
      className={`${
        historyStore.showAdvancedPrompt ? "lg:hidden" : "lg:flex"
      } ${
        checkRouter() ? "lg:hidden" : "lg:block"
      } hidden lg:inset-y-0 lg:w-72 lg:flex-col overflow-hidden border-r border-gray-200`}
    >
      <div className="h-full flex grow flex-col overflow-y-auto px-2">
        <button className="p-3 flex gap-3">
          <div className="flex gap-[2px] items-center">
            <Image src={"/icons/app_icon.svg"} width={28} height={28} alt="" />
            <Image src={"/icons/Jan.svg"} width={27} height={12} alt="" />
          </div>
        </button>
        <div className="flex flex-col gap-3 overflow-x-hidden h-full">
          <div className="flex flex-col h-16 shrink-0 items-center gap-[10px]">
            <SearchBar onTextChanged={onSearching} />
          </div>
          <div className="flex flex-col flex-auto overflow-x-hidden h-full scroll">
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
      <div className="border-t border-gray-200 p-3 gap-3 flex items-center justify-between">
        <button className="flex gap-2 items-center rounded-lg text-gray-900 text-xs leading-[18px]">
          <Image
            src={"/icons/ico_mobile-android.svg"}
            width={16}
            height={16}
            alt=""
          />
          Get the app
        </button>
        <button className="flex items-center rounded-lg text-purple-700 text-xs leading-[18px] font-semibold gap-2">
          <Image src={"/icons/ico_Discord.svg"} width={20} height={20} alt="" />
          Discord
        </button>
      </div>
    </div>
  );
});
