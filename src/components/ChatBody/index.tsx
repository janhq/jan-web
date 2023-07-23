import { SimpleTextMessage } from "@/components/SimpleTextMessage";
import React, { useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStore } from "../../models/RootStore";
import { observer } from "mobx-react-lite";

type Props = {
  chatHeight: number;
};

export const ChatBody: React.FC<Props> = observer(({ chatHeight }) => {
  const { historyStore } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (chatHeight > 60) {
      setHeight(ref.current?.offsetHeight ?? 0 - 24);
    } else {
      setHeight(ref.current?.offsetHeight ?? 0);
    }
  }, [chatHeight]);

  const loadFunc = () => {};

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
    <div className={`flex-1 w-full`} ref={ref}>
      {height > 0 && (
        <div style={{ height: height, overflowX: "hidden" }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={false}
            loader={loader}
          >
            <div className={`flex flex-col justify-end gap-8 py-2`}>
              {historyStore
                .getActiveMessages()
                .map(
                  ({ senderAvatarUrl, senderName, createdAt, text }, index) => (
                    <SimpleTextMessage
                      key={index}
                      avatarUrl={senderAvatarUrl}
                      senderName={senderName}
                      createdAt={createdAt}
                      text={text}
                    />
                  )
                )}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
});
