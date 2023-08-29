import ShowMoreButton from ".";

export default {
  title: "ShowMoreButton",
  component: ShowMoreButton,
};

type Props = {
  onClick: () => void;
};

export const ShowMoreButtonStory: React.FC<Props> = ({ onClick }) => (
  <ShowMoreButton onClick={onClick} />
);
