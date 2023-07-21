import avatar from "@/assets/Thumbnail02.png";
import test from "@/assets/test.jpg";
import { SimpleTextMessage } from "@/components/SimpleTextMessage";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

export const ChatBody: React.FC = () => {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const [messages, setMessages] = useState([
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
  ]);
  React.useLayoutEffect(() => {
    setHeight(ref.current?.offsetHeight);
  }, []);

  const user = {
    avatarUrl: avatar.src,
    SenderName: "Engerraund Serac",
    time: "11:56",
    text: "Here’s the picture inspired from your prompt:",
    imageUrl: test,
  };

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
              {messages.map((item, index) => (
                <SimpleTextMessage senderName={""} key={index} {...user} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
