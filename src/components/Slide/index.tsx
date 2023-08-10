import Image from "next/image";
import { FC } from "react";

interface ISlideprops {
  image?: string;
  title?: string;
  description?: string;
}
const Slide: FC<ISlideprops> = ({ description, image, title }) => {
  return (
    <div className="w-full h-[435px] relative">
      <Image
        className="w-full h-full object-cover"
        src={image}
        layout="fill"
        alt=""
      />
      <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0">
        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">{title}</h2>
            <span className="text-gray-300 text-xs">{description}</span>
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
