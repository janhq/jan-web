type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const SendButton: React.FC<Props> = ({ onClick, disabled }) => {
  const enabledStyle = {
    backgroundColor: "#FACA15",
  };

  const disabledStyle = {
    backgroundColor: "#F3F4F6",
  };

  return (
    <button
      onClick={onClick}
      style={disabled ? disabledStyle : enabledStyle}
      type="submit"
      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Post
    </button>
  );
};

export default SendButton;
