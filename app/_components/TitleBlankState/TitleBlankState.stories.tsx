import { TitleBlankState } from ".";

export default {
  title: "TitleBlankState",
  component: TitleBlankState,
};

type Props = {
  title: string;
};

export const TitleBlankStateStory: React.FC<Props> = ({ title }) => (
  <TitleBlankState title={title} />
);
