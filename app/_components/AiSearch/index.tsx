import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search: React.FC = () => {
  return (
    <div className="flex bg-gray-200 w-[343px] h-[36px] items-center px-2 gap-[6px] rounded-md">
      <MagnifyingGlassIcon width={16} height={16} color="#3C3C4399" />
      <input
        className="bg-inherit outline-0 w-full border-0 p-0 focus:ring-0"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
