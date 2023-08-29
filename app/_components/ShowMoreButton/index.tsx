import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  onClick: () => void;
};

const ShowMoreButton: React.FC<Props> = ({ onClick }) => (
  <button
    className="flex text-xs leading-[18px] text-gray-800 rounded-lg py-2 px-3"
    onClick={onClick}
  >
    Show more
    <ChevronDownIcon width={16} height={16} />
  </button>
);

export default React.memo(ShowMoreButton);
