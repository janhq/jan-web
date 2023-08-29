import ModelInfo from ".";

export default {
  title: "ModelInfo",
  component: ModelInfo,
};

type Props = {
  modelName: string;
  inferenceTime: string;
  hardware: string;
  pricing: string;
};

export const ModelInfoStory: React.FC<Props> = (props) => (
  <ModelInfo {...props} />
);
