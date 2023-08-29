import SearchBar from ".";

export default {
  title: "SearchBar",
  component: SearchBar,
};

interface ISearchBarProps {
  onTextChanged: (text: string) => void;
}

export const SearchBarStory: React.FC<ISearchBarProps> = ({
  onTextChanged,
}) => <SearchBar onTextChanged={onTextChanged} />;
