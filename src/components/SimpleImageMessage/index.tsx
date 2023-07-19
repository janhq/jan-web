import Image from "next/image";

type Props = {
  avatarUrl: string;
  SenderName: string;
  time: string;
  text: string;
  imageUrl: {
    src: string;
    width: number;
    height: number;
  };
}

export const SimpleImageMessage: React.FC<Props> = ({
  SenderName,
  avatarUrl,
  imageUrl,
  text,
  time,
}) => {
  return (
    <div className="flex items-start gap-2">
      <Image src={avatarUrl} width={32} height={32} alt="" />
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 justify-start items-baseline">
          <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
            {SenderName}
          </div>
          <div className="text-[11px] leading-[13.2px] font-medium">{time}</div>
        </div>
        <div className="leading-[20px] text-[14px]">{text}</div>
        <div className="flex items-center gap-3">
          <Image
            src={imageUrl.src}
            width={imageUrl.width}
            height={imageUrl.height}
            alt=""
          />
          <button className="flex gap-1 items-center px-2 py-1 bg-[#F3F4F6] rounded-[12px]">
            <Image src="/icons/download.svg" width={16} height={16} alt="" />
            <span className="leading-[20px] text-[14px] text-[#111928]">
              Download
            </span>
          </button>
          <button className="flex gap-1 items-center px-2 py-1 bg-[#F3F4F6] rounded-[12px]">
            <Image src="/icons/refresh.svg" width={16} height={16} alt="" />
            <span className="leading-[20px] text-[14px] text-[#111928]">
              Re-generate
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
