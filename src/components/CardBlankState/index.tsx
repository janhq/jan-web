import Image from "next/image";

type Props = {
  name: string;
  description: string;
  avatar: string;
};

export const CardBlankState: React.FC<Props> = ({
  avatar,
  description,
  name,
}) => {
  return (
    <div className="flex gap-3 p-3 bg-white odd:rounded-t-[8px] even:rounded-b-[8px]">
      <div className="gap-6 flex items-center">
        <div className="w-[40px] h-[40px]">
          <Image
            className="max-w-none"
            src={avatar}
            width={40}
            height={40}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[14px] leading-[20px] font-bold text-[#111928]">
            {name}
          </h2>
          <span className="text-[12px] leading-[18px] text-[#9CA3AF] break-all">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};
