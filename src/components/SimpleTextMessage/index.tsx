import Image from "next/image";

type Props = {
  avatarUrl: string;
  senderName: string;
  time: string;
  text: string;
};

export const SimpleTextMessage: React.FC<Props> = ({
  senderName,
  avatarUrl,
  text,
  time,
}) => {
  return (
    <div className="flex items-start gap-2">
      <Image src={avatarUrl} width={32} height={32} alt="" />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-1 justify-start items-baseline">
          <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
            {senderName}
          </div>
          <div className="text-[11px] leading-[13.2px] font-medium">{time}</div>
        </div>
        <div className="leading-[20px] text-[14px]">{text}</div>
      </div>
    </div>
  );
};
