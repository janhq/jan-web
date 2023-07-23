import Image from "next/image";

export const SampleImage: React.FC = () => {
  return (
    <div className="flex gap-[18px] w-[633px] h-[520px]">
      <div className="w-[53px] h-full bg-[#D9D9D9] opacity-50"></div>
      <div className="flex-1 flex bg-[#D9D9D9] items-center justify-center">
        <Image
          src={"/icons/unicorn_image-v.svg"}
          width={77}
          height={77}
          alt=""
        />
      </div>
      <div className="w-[53px]  h-full bg-[#D9D9D9] opacity-50"></div>
    </div>
  );
};
