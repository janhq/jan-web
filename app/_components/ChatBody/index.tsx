import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStore } from "@/_models/RootStore";
import { observer } from "mobx-react-lite";
import { ChatMessage, MessageType } from "@/_models/ChatMessage";
import SimpleImageMessage from "../SimpleImageMessage";
import SimpleTextMessage from "../SimpleTextMessage";
import { Instance } from "mobx-state-tree";
import Lottie from "lottie-react";
import animationData from "@/../public/lotties/typing.json";
import { GenerativeSampleContainer } from "../GenerativeSampleContainer";
import { AiModelType } from "@/_models/AiModel";
import SampleLlmContainer from "@/_components/SampleLlmContainer";

type Props = {
  onPromptSelected: (prompt: string) => void;
};

export const ChatBody: React.FC<Props> = observer(({ onPromptSelected }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { historyStore } = useStore();
  const refSmooth = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const refContent = useRef<HTMLDivElement>(null);
  const convo = historyStore.getActiveConversation();
  const hasMore = !convo?.isFetching && (convo?.hasMore ?? false);

  useEffect(() => {
    refSmooth.current?.scrollIntoView({ behavior: "instant" });
  }, [heightContent]);

  useLayoutEffect(() => {
    if (refContent.current) {
      setHeightContent(refContent.current?.offsetHeight);
    }
  });

  useLayoutEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current?.offsetHeight);
  }, []);

  const loadFunc = () => {
    historyStore.fetchMoreMessages();
  };

  const messages = historyStore.getActiveMessages();

  const shouldShowSampleContainer = messages.length === 0;

  const shouldShowImageSampleContainer =
    shouldShowSampleContainer &&
    convo &&
    convo.aiModel.aiModelType === AiModelType.GenerativeArt;

  const model = convo?.aiModel;

  return (
    <div className="flex-grow flex flex-col h-fit overflow-x-hidden" ref={ref}>
      {shouldShowSampleContainer && model ? (
        shouldShowImageSampleContainer ? (
          <GenerativeSampleContainer />
        ) : (
          <SampleLlmContainer
            model={convo?.aiModel}
            onPromptSelected={onPromptSelected}
          />
        )
      ) : (
        <div
          className="flex flex-col-reverse"
          style={{
            height: height + "px",
            overflowX: "hidden",
          }}
        >
          <InfiniteScroll
            isReverse={true}
            loadMore={loadFunc}
            hasMore={hasMore}
          >
            <div
              className={`flex flex-col justify-end gap-8 py-2`}
              ref={refContent}
            >
              {messages
                .slice()
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((message, index) => renderItem(index, message))}
            <div ref={refSmooth}>
              {convo?.isWaitingForModelResponse && (
                <div className="w-[50px] h-[50px] flex flex-row items-start justify-start">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoPlay={true}
                    height={50}
                    width={50}
                  />
                </div>
              )}
            </div>
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