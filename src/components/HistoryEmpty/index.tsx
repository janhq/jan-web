import Image from "next/image";

export const HistoryEmpty: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-4">
      <Image
        src={"/icons/chats-circle-light.svg"}
        width={50}
        height={50}
        alt=""
      />
      <p className="text-[14px] leading-5 text-center text-[#9CA3AF]">
        Jan allows you to use 100s of AIs on your mobile phone
      </p>
      <button className="bg-[#1F2A37] py-[10px] px-5 gap-2 rounded-[8px] text-[14px] font-medium leading-[21px] text-white">
        Explore AIs
      </button>
    </div>
  );
};
