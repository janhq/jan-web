/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

type Props = {
  avatarUrl?: string;
  senderName: string;
  text?: string;
  createdAt: number;
  imageUrls: string[];
};

export const SimpleImageMessage: React.FC<Props> = ({
  avatarUrl = "",
  senderName,
  imageUrls,
  text,
  createdAt,
}) => {
  const displayDate = new Date(createdAt).toLocaleString();

  return (
    <div className="flex items-start gap-2">
      <Image src={avatarUrl} width={32} height={32} alt="" />
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 justify-start items-baseline">
          <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
            {senderName}
          </div>
          <div className="text-[11px] leading-[13.2px] font-medium">
            {displayDate}
          </div>
        </div>
        {text && <div className="leading-[20px] text-[14px]">{text}</div>}
        <div className="flex items-center gap-3">
          <img
            src={
              process.env.NEXT_PUBLIC_ENV === "development"
                ? `${process.env.NEXT_PUBLIC_DEV_BUCKET_URL}/${imageUrls[0]
                    .split("/")
                    .pop()}`
                : imageUrls[0]
            }
            alt=""
            className="w-72 aspect-square rounded-lg"
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
