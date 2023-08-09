import Link from "next/link";
import { FC } from "react";

interface ISlideprops {
  productId?: string;
  image?: string;
  title?: string;
  description?: string;
}
const Slide: FC<ISlideprops> = (props) => {
  return (
    <Link href={`/ai/${props.productId}`} className='w-full h-full'>
      <div className="w-full relative">
        <img
          className="w-full aspect-video object-cover rounded-lg"
          src={props.image}
          alt=""
        />
        <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0 inset-x-0 rounded-bl-lg rounded-br-lg">
          <div className="flex flex-row justify-between items-center p-4 gap-4">
            <div className="flex-grow flex flex-col overflow-hidden h-14 justify-center">
              <h2 className="font-bold">{props.title}</h2>
              <p className="text-gray-300 text-xs line-clamp-2 text-ellipsis">
                {props.description}
              </p>
            </div>
            <Link
              href={{
                pathname: `/chat`,
                query: { productId: props.productId },
              }}
              className="flex-none flex w-30 h-12 items-center justify-center gap-2 px-5 py-[10px] rounded-md bg-white text-black"
            >
              Try now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Slide;
