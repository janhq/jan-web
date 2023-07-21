import { SearchIcon } from "@/assets";

const Search: React.FC = () => {
  return (
    <div className="flex bg-gray-200 w-[343px] h-[36px] items-center px-2 gap-[6px] rounded-md">
      <SearchIcon />
      <input className="bg-inherit outline-0 w-full" placeholder="Search" />
    </div>
  );
};

export default Search;
