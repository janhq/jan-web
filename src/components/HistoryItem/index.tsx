import Image from "next/image";
import React from "react";

type Props = {
  avatar: string;
  name: string;
  description?: string;
};

const HistoryItem: React.FC<Props> = ({ avatar, name, description }) => {
  return (
    <div className="flex items-center gap-2 w-full rounded-[8px] p-2">
      <Image src={avatar} width={36} height={36} alt="" />
      <div className="flex flex-col text-[14px] leading-[20px] w-full">
        <span className="text-[#111928] pb-1">{name}</span>
        <span className="text-[#9CA3AF] hidden-text">{description}</span>
      </div>
    </div>
  );
};

export default HistoryItem;
