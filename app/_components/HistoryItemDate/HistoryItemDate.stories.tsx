import HistoryItemDate from ".";

export default {
  title: "HistoryItemDate",
  component: HistoryItemDate,
};

type Props = {
  timestamp: number;
};

export const HistoryItemDateStory: React.FC<Props> = ({ timestamp }) => (
  <HistoryItemDate timestamp={timestamp} />
);
