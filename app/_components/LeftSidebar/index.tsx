import React from "react";
import SearchBar from "../SearchBar";
import ShortcutList from "../ShortcutList";
import HistoryList from "../HistoryList";
import DiscordContainer from "../DiscordContainer";
import JanLogo from "../JanLogo";
import { useSetAtom } from "jotai";
import { activeConversationIdAtom } from "@/_helpers/JotaiWrapper";

const LeftSidebar: React.FC = () => {
  const setActiveConversationIdAtom = useSetAtom(activeConversationIdAtom);

  return (
    <div className="hidden h-screen lg:flex flex-col lg:inset-y-0 lg:w-72 lg:flex-col flex-shrink-0 overflow-hidden border-r border-gray-200 dark:bg-gray-800">
      <JanLogo onClick={() => setActiveConversationIdAtom(undefined)} />
      <div className="flex flex-col flex-1 gap-3 overflow-x-hidden">
        <SearchBar />
        <ShortcutList />
        <HistoryList />
      </div>
      <DiscordContainer />
    </div>
  );
};

export default LeftSidebar;
