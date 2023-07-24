import { FC } from "react";

interface ISlideprops {
  image?: string;
  title?: string;
  description?: string
}
const Slide: FC<ISlideprops> = (props) => {
  return (
    <div className="w-full relative">
      <img
        className="w-[1000px] aspect-video object-cover rounded-lg"
        src={props.image}
        alt=""
      />
      <div className="absolute bg-[rgba(0,0,0,0.7)] w-full text-white bottom-0 rounded-bl-lg rounded-br-lg">
        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <h2 className="font-bold">{props.title}</h2>
            <span className="text-gray-300 text-xs">
              {props.description}
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
