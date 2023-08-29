import AiTypeCard from ".";

export default {
  title: "AiTypeCard",
  component: AiTypeCard,
};

type Props = {
  name: string;
  imageUrl: string;
};

export const AiTypeCardStory: React.FC<Props> = ({ imageUrl, name }) => (
  <AiTypeCard imageUrl={imageUrl} name={name} />
);

const defaultProps: Props = {
  name: "James",
  imageUrl:
    "https://i.pinimg.com/564x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg",
};

export const PreviewAiTypeCardStory: React.FC = () => (
  <AiTypeCardStory {...defaultProps} />
);
