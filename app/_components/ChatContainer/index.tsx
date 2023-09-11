"use client";

import ModelDetailSideBar from "../ModelDetailSideBar";
import ProductOverview from "../ProductOverview";
import MainChat from "../MainChat";
import { useAtomValue } from "jotai";
import {
  activeConversationIdAtom,
  showingProductDetailAtom,
} from "@/_helpers/JotaiWrapper";

const ChatContainer: React.FC = () => {
  const activeConversationId = useAtomValue(activeConversationIdAtom);
  const showingProductDetail = useAtomValue(showingProductDetailAtom);

  if (!activeConversationId) {
    return <ProductOverview />;
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <MainChat />
      {showingProductDetail ? <ModelDetailSideBar /> : null}
    </div>
  );
};

export default ChatContainer;
