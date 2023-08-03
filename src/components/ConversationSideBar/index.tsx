import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar";
import ShortcutList from "../ShortcutList";
import HistoryList from "../HistoryList";
import { HistoryEmpty } from "../HistoryEmpty";
import { useGetShortcuts } from "../../hooks/useGetShortcuts";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/RootStore";
import GetTheAppComponent from "../GetTheAppComponent";

const ConversationSideBar: React.FC = observer(() => {
  const { shortcuts, fetchShortcuts } = useGetShortcuts();
  const { historyStore } = useStore();

  useEffect(() => {
    fetchShortcuts();
  }, []);

  return (
    <div className="hidden flex-col border-r border-gray-200 md:block md:w-72">
      <div className="h-full flex grow flex-col gap-y-3">
        <Link href="/" className="flex items-center space-x-2 mt-3 mx-3">
          <Image
            className="h-8 w-auto"
            src="/icons/app_icon.svg"
            alt=""
            width={32}
            height={32}
          />
          <span className="font-bold">Jan</span>
        </Link>
        <div className="flex flex-col shrink-0 items-center mx-3">
          <SearchBar />
        </div>
        <div className="flex flex-col flex-auto overflow-x-hidden overflow-y-auto h-full scroll mt-3">
          <ShortcutList products={shortcuts} />
          {historyStore.conversations.length > 0 ? (
            <HistoryList />
          ) : (
            <HistoryEmpty />
          )}
        </div>
        <GetTheAppComponent />
      </div>
    </div>
  );
});

export default ConversationSideBar;
