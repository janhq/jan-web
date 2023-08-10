import React from "react";
import { displayDate } from "@/utils/datetime";

type Props = {
  avatarUrl?: string;
  senderName: string;
  createdAt: number;
  text?: string;
};

const SimpleTextMessage: React.FC<Props> = ({
  senderName,
  createdAt,
  avatarUrl = "",
  text = "",
}) => (
  <div className="flex items-start gap-2">
    <img
      className="rounded-full"
      src={avatarUrl}
      width={32}
      height={32}
      alt=""
    />
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-1 justify-start items-baseline">
        <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
          {senderName}
        </div>
        <div className="text-[11px] leading-[13.2px] font-medium text-gray-400 ml-2">
          {displayDate(createdAt)}
        </div>
      </div>
      <p className="leading-[20px] whitespace-break-spaces text-[14px] font-normal">
        {text}
      </p>
    </div>
  </div>
);

export default React.memo(SimpleTextMessage);
