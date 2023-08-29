import { TabModelDetail } from ".";
export default {
  title: "TabModelDetail",
  component: TabModelDetail,
};

type Props = {
  onTabClick: (clickedTab: "description" | "api") => void;
  tab: string;
};

export const TabModelDetailStory: React.FC<Props> = (Props) => (
  <TabModelDetail {...Props} />
);
