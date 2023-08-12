import React from "react";
import Image from "next/image";

const JanWelcomeTitle: React.FC = () => {
  return (
    <div className="flex items-center flex-col gap-3">
      <h2 className="text-[22px] leading-7 font-bold">Dreamshaper</h2>
      <span className="flex items-center text-xs leading-[18px]">
        Operated by
        <Image src={"/icons/ico_logo.svg"} width={42} height={22} alt="" />
      </span>
      <span className="text-xs leading-[18px]">
        Portrait illustration style that sits between photorealistic and
        computer graphics
      </span>
    </div>
  );
};

export default React.memo(JanWelcomeTitle);
