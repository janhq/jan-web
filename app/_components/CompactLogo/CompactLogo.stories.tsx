import CompactLogo from ".";

export default {
  title: "CompactLogo",
  component: CompactLogo,
};

type Props = {
  onClick: () => void;
};

export const CompactLogoStory: React.FC<Props> = (props) => (
  <CompactLogo onClick={props.onClick} />
);
