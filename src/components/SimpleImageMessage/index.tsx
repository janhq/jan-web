import JanImage from "../JanImage";
import { displayDate } from "@/utils/datetime";

type Props = {
  avatarUrl?: string;
  senderName: string;
  text?: string;
  createdAt: number;
  imageUrls: string[];
};

const SimpleImageMessage: React.FC<Props> = ({
  avatarUrl = "",
  senderName,
  imageUrls,
  text,
  createdAt,
}) => (
  <div className="flex items-start gap-2">
    <img
      className="rounded-full"
      src={avatarUrl}
      width={32}
      height={32}
      alt=""
    />
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 justify-start items-baseline">
        <div className="text-[#1B1B1B] text-[13px] font-extrabold leading-[15.2px]">
          {senderName}
        </div>
        <div className="text-[11px] leading-[13.2px] font-medium text-gray-400 ml-2">
          {displayDate(createdAt)}
        </div>
      </div>
      {text && <div className="leading-[20px] text-[14px]">{text}</div>}
      <div className="flex items-center gap-3">
        <JanImage
          imageUrl={imageUrls[0]}
          className="w-72 aspect-square rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default SimpleImageMessage;
