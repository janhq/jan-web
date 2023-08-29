import ModelInfoItem from ".";

export default {
  title: "ModelInfoItem",
  component: ModelInfoItem,
};

type Props = {
  name: string;
  description: string;
};
export const ModelInfoItemStory: React.FC<Props> = (props) => (
  <ModelInfoItem {...props} />
);
