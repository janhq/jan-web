import Image from "next/image";
import React from "react";

type Props = {
  onClick?: () => void;
};

const JanLogo: React.FC<Props> = ({ onClick }) => (
  <button
    className="p-3 flex gap-[2px] items-center"
    onClick={() => onClick?.()}
  >
    <Image src={"/icons/app_icon.svg"} width={28} height={28} alt="" />
    <Image src={"/icons/Jan.svg"} width={27} height={12} alt="" />
  </button>
);

export default React.memo(JanLogo);
