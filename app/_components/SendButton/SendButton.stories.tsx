import SendButton from ".";

export default {
  title: "SendButton",
  component: SendButton,
};

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export const SendButtonStory: React.FC<Props> = (props) => (
  <SendButton {...props} />
);
