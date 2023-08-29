import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const SendButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  const enabledStyle = {
    backgroundColor: "#FACA15",
  };

  const disabledStyle = {
    backgroundColor: "#F3F4F6",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={disabled ? disabledStyle : enabledStyle}
      type="submit"
      className="p-2 gap-[10px] inline-flex items-center rounded-[12px] text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <ArrowSmallRightIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default SendButton;
