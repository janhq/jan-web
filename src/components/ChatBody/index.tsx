import { SimpleTextMessage } from "@/components/SimpleTextMessage";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStore } from "../../models/RootStore";
import { observer } from "mobx-react-lite";
import { MessageType } from "../../models/ChatMessage";
import { SimpleImageMessage } from "../SimpleImageMessage";

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

  useLayoutEffect(() => {
    if (chatHeight > 60 && ref.current?.offsetHeight) {
      setHeight(ref.current?.offsetHeight - 24);
    } else {
      setHeight(ref.current?.offsetHeight ?? 0);
    }
  }, [chatHeight]);

  useEffect(() => {
    refSmooth.current?.scrollIntoView({ behavior: "smooth" });
  }, [heightContent]);

  useLayoutEffect(() => {
    if (refContent.current) {
      setHeightContent(refContent.current?.offsetHeight);
    }
  });

  const loadFunc = () => {};

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

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
            pageStart={0}
            loadMore={loadFunc}
            hasMore={false}
            loader={loader}
          >
            <div
              className={`flex flex-col justify-end gap-8 py-2`}
              ref={refContent}
            >
              {historyStore
                .getActiveMessages()
                .map(
                  (
                    {
                      senderAvatarUrl,
                      senderName,
                      createdAt,
                      text,
                      messageType,
                      imageUrls,
                    },
                    index
                  ) => {
                    if (messageType === MessageType.Image) {
                      return (
                        <SimpleImageMessage
                          key={index}
                          avatarUrl={senderAvatarUrl}
                          senderName={senderName}
                          createdAt={createdAt}
                          imageUrls={imageUrls ?? []}
                        />
                      );
                    } else if (messageType === MessageType.Text) {
                      return (
                        <SimpleTextMessage
                          key={index}
                          avatarUrl={senderAvatarUrl}
                          senderName={senderName}
                          createdAt={createdAt}
                          text={text}
                        />
                      );
                    }
                  }
                )}
              <div ref={refSmooth}></div>
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
});
