import Image from "next/image";

type Props = {
  onClick: () => void;
};

const EnhanceButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="rounded-[12px] flex items-center h-[40px] gap-1 bg-[#F3F4F6] px-2 text-xs font-normal text-gray-900 shadow-sm hover:bg-indigo-100"
      onClick={onClick}
    >
      <Image src={"/icons/ic_enhance.svg"} width={16} height={16} alt="" />
      <span>Enhance</span>
    </button>
  );
};

export default EnhanceButton;
