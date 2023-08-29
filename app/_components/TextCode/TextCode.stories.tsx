import { TextCode } from ".";

export default {
  title: "TextCode",
  component: TextCode,
};

type Props = {
  text: string;
};

export const TextCodeStory: React.FC<Props> = ({ text }) => (
  <TextCode text={text} />
);
