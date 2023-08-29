import TogglableHeader from ".";

export default {
  title: "TogglableHeader",
  component: TogglableHeader,
};

type Props = {
  icon: string;
  title: string;
  expand: boolean;
  onTitleClick: () => void;
};

const defaultProps: Props = {
  title: "Sample title",
  icon: "/icons/unicorn_arrow.svg",
  expand: true,
  onTitleClick: () => {},
};

export const TogglableHeaderStory: React.FC<Props> = (Props) => (
  <TogglableHeader {...Props} />
);

export const PreviewTogglableHeaderStory: React.FC = () => (
  <TogglableHeaderStory {...defaultProps} />
);
