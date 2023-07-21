import { FC } from "react";
import Image from "next/image";
import img from "@/assets/Image.png";

const Slide: FC = () => {
  return (
    <div className="w-full relative">
      <Image
        className="w-full"
        src={img.src}
        width={1000}
        height={1000}
        alt=""
      />
      <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0 rounded-bl-lg rounded-br-lg">
        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">Dreamshaper</h2>
            <span className="text-gray-300 text-xs">
              Text-to-image AI which can give you rich details images
            </span>
          </div>
          <button className="gap-2 px-5 py-[10px] rounded-md bg-white text-black">
            Try now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
