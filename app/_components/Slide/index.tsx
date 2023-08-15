import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ISlideprops {
  productId?: string;
  image?: string;
  title?: string;
  description?: string;
}

const Slide: FC<ISlideprops> = ({ description, image, title, productId }) => {
  return (
    <div className="w-full embla__slide h-[435px] relative">
      <Image
        className="object-cover w-full h-full embla__slide__img"
        src={image ?? ""}
        layout="fill"
        alt=""
      />
      <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0 right-0">
        <div className="flex justify-between p-4">
          <div className="flex flex-col gap-[2px]">
            <h2 className="font-semibold text-xl leading-[25px] tracking-[-0.5px]">
              {title}
            </h2>
            <span className="text-gray-300 text-xs leading-[18px]">
              {description}
            </span>
          </div>
          <Link
            href={{
              pathname: `/chat`,
              query: { productId: productId },
            }}
            className="flex-none flex w-30 h-12 items-center text-sm justify-center gap-2 px-5 py-[10px] rounded-md bg-white leading-[21px] text-gray-800"
          >
            Try now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
