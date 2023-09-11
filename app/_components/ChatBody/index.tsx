import React, { useCallback, useRef, useState } from "react";
import ChatItem from "../ChatItem";
import { ChatMessage } from "@/_models/ChatMessage";
import useChatMessages from "@/_hooks/useChatMessages";
import { currentChatMessagesAtom } from "@/_helpers/JotaiWrapper";
import { useAtomValue } from "jotai";

const ChatBody: React.FC = () => {
  const messages = useAtomValue(currentChatMessagesAtom);
  const [offset, setOffset] = useState(0);
  const { loading, hasMore } = useChatMessages(offset);
  const intersectObs = useRef<any>(null);

  const lastPostRef = useCallback(
    (message: ChatMessage) => {
      if (loading) return;

      if (intersectObs.current) intersectObs.current.disconnect();

      intersectObs.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 5);
        }
      });

      if (message) intersectObs.current.observe(message);
    },
    [loading, hasMore]
  );

  const content = messages.map((message, index) => {
    if (messages.length === index + 1) {
      return <ChatItem ref={lastPostRef} message={message} key={index} />;
    }
    return <ChatItem message={message} key={index} />;
  });

  return (
    <div className="flex flex-col-reverse flex-1 gap-8 py-8 overflow-y-auto scroll">
      {content}
    </div>
  );
};

export default ChatBody;
