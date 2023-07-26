import { create } from "domain";
import { useCallback } from "react";

type Props = {
  avatarUrl?: string;
  senderName: string;
  createdAt: number;
  text?: string;
};

export const SimpleTextMessage: React.FC<Props> = ({
  senderName,
  avatarUrl = "",
  createdAt,
  text = "",
}) => {
  const isToday = useCallback(() => {
    const today = new Date();
    return (
      today.setHours(0, 0, 0, 0) == new Date(createdAt).setHours(0, 0, 0, 0)
    );
  }, [createdAt]);

  let displayDate = new Date(createdAt).toLocaleString();
  if (isToday()) {
    displayDate = new Date(createdAt).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
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
            {displayDate}
          </div>
        </div>
        <pre className="leading-[20px] text-[14px] whitespace-break-spaces">
          {text}
        </pre>
      </div>
    </div>
  );
};
