import React from "react";
import { displayDate } from "@/_utils/datetime";
import { TextCode } from "../TextCode";
import { getMessageCode } from "@/_utils/message";
import Image from "next/image";

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
  <div className="flex items-start gap-2 ml-3">
    <Image
      className="rounded-full"
      src={avatarUrl}
      width={32}
      height={32}
      alt=""
    />
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-1 justify-start items-baseline">
        <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px] dark:text-[#d1d5db]">
          {senderName}
        </div>
        <div className="text-[11px] leading-[13.2px] font-medium text-gray-400">
          {displayDate(createdAt)}
        </div>
      </div>
      {text.includes("```") ? (
        getMessageCode(text).map((item, i) => (
          <div className="flex gap-1 flex-col" key={i}>
            <p className="leading-[20px] whitespace-break-spaces text-[14px] font-normal dark:text-[#d1d5db]">
              {item.text}
            </p>
            {item.code.trim().length > 0 && <TextCode text={item.code} />}
          </div>
        ))
      ) : (
        <p className="leading-[20px] whitespace-break-spaces text-[14px] font-normal dark:text-[#d1d5db]">
          {text}
        </p>
      )}
    </div>
  </div>
);

export default React.memo(SimpleTextMessage);
