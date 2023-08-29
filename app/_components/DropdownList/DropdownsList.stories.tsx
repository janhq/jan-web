import { DropdownsList } from ".";

export default {
  title: "DropdownsList",
  component: DropdownsList,
};

type Props = {
  title: string;
  data: string[];
};

export const DropdownsListStory: React.FC<Props> = (props) => (
  <DropdownsList {...props} />
);
