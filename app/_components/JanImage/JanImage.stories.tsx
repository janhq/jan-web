import JanImage from ".";

export default {
  title: "JanImage",
  component: JanImage,
};

type Props = {
  imageUrl: string;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export const JanImageStory: React.FC<Props> = (props) => (
  <JanImage {...props} />
);
