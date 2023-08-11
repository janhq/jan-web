import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStore } from "../../models/RootStore";
import { observer } from "mobx-react-lite";
import { ChatMessage, MessageType } from "../../models/ChatMessage";
import SimpleImageMessage from "../SimpleImageMessage";
import SimpleTextMessage from "../SimpleTextMessage";
import { Instance } from "mobx-state-tree";
import Lottie from "lottie-react";
import animationData from "@/../public/lotties/typing.json";

type Props = {
  chatHeight: number;
};

export const ChatBody: React.FC<Props> = observer(({ chatHeight }) => {
  const { historyStore } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const refSmooth = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [heightContent, setHeightContent] = useState(0);

  const refContent = useRef<HTMLDivElement>(null);
  const convo = historyStore.getActiveConversation();
  const hasMore = !convo?.isFetching && (convo?.hasMore ?? false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useLayoutEffect(() => {
    if (chatHeight > 60 && ref.current?.offsetHeight) {
      setHeight(ref.current?.offsetHeight - 24);
    } else {
      setHeight(ref.current?.offsetHeight ?? 0);
    }
  }, [chatHeight]);

  useEffect(() => {
    refSmooth.current?.scrollIntoView({ behavior: "instant" });
  }, [heightContent]);

  useLayoutEffect(() => {
    if (refContent.current) {
      setHeightContent(refContent.current?.offsetHeight);
    }
  });

  const loadFunc = () => {
    historyStore.fetchMoreMessages();
  };

  return (
    <div className={`flex-1 w-full flex flex-col justify-end h-fit`} ref={ref}>
      {height > 0 && (
        <div
          style={{
            height: heightContent > height ? height + "px" : "fit-content",
            overflowX: "hidden",
          }}
        >
          <InfiniteScroll
            isReverse={true}
            loadMore={loadFunc}
            hasMore={hasMore}
            initialLoad={true}
            useWindow={false}
          >
            <div
              className={`flex flex-col justify-end gap-8 py-2`}
              ref={refContent}
            >
              {historyStore
                .getActiveMessages()
                .map((message, index) => renderItem(index, message))}
              <div ref={refSmooth}>
                {convo?.isWaitingForModelResponse && (
                  <div className="w-[50px] h-[50px] flex flex-row items-start justify-start">
                    <Lottie animationData={animationData} loop={true} autoPlay={true} height={50} width={50} />
                  </div>
                )}
              </div>
              {/* Typing */}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
});

const renderItem = (
  index: number,
  {
    messageType,
    senderAvatarUrl,
    senderName,
    createdAt,
    imageUrls,
    text,
  }: Instance<typeof ChatMessage>
) => {
  switch (messageType) {
    case MessageType.Image:
      return (
        <SimpleImageMessage
          key={index}
          avatarUrl={senderAvatarUrl}
          senderName={senderName}
          createdAt={createdAt}
          imageUrls={imageUrls ?? []}
          text={text}
        />
      );
    case MessageType.Text:
      return (
        <SimpleTextMessage
          key={index}
          avatarUrl={senderAvatarUrl}
          senderName={senderName}
          createdAt={createdAt}
          text={text}
        />
      );
    case MessageType.WaitingResponse:
      return null;
    default:
      return null;
  }
};
