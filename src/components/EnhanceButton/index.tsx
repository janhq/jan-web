type Props = {
  onClick: () => void;
};

const EnhanceButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="rounded bg-gray-100 px-2 py-2 text-xs font-normal text-gray-900 shadow-sm hover:bg-indigo-100"
      onClick={onClick}
    >
      Enhance
    </button>
  );
};

export default EnhanceButton;