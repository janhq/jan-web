import Image from "next/image";

export const ModifyImages: React.FC = () => {
  const iamges = [
    "https://i.pinimg.com/564x/fb/0a/8d/fb0a8d48ea22d77adc556931fc80776d.jpg",
    "https://i.pinimg.com/564x/2e/36/ea/2e36ea65db7f3672be324a4a83de6f12.jpg",
  ];
  return (
    <div className="py-[17px] px-[37px] gap-3 rounded border border-gray-300 flex flex-col items-center">
      <span className="text-[11px] leading-[13px] font-semibold text-gray-400">
        HOW TO USE?
      </span>
      <span className="text-xs leading-[18px] text-gray-700">
        Upload your own image and refine it by prompting
      </span>
      <div className="flex relative gap-[7px]">
        {iamges.map((item, index) => (
          <Image
            className="rounded-[10px]"
            style={{ objectFit: "cover", width: "245px", height: "245px" }}
            src={item}
            key={index}
            width={245}
            height={245}
            alt=""
          />
        ))}
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="bg-[#00000099] p-[9px] rounded-full">
            <Image
              src={"/icons/ico_arrow-right.svg"}
              width={38}
              height={38}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
