import JanWelcomeTitle from ".";

export default {
  title: "JanWelcomeTitle",
  component: JanWelcomeTitle,
};

type Props = {
  title: string;
  description: string;
};

export const JanWelcomeTitleStory: React.FC<Props> = (props) => (
  <JanWelcomeTitle {...props} />
);
