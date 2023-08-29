import React from "react";
import SimpleTextMessage from ".";

export default {
  title: "SimpleTextMessage",
  component: SimpleTextMessage,
};

type Props = {
  avatarUrl?: string;
  senderName: string;
  createdAt: number;
  text?: string;
};

const DefaultProps: Props = {
  avatarUrl:
    "https://i.pinimg.com/564x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg",
  senderName: "John Doe",
  createdAt: 1630108800000,
  text: "Hello, world!",
};

export const SimpleTextMessageStory: React.FC<Props> = (props) => (
  <SimpleTextMessage {...props} />
);

export const PrviewProps: React.FC = () => (
  <SimpleTextMessageStory {...DefaultProps} />
);
