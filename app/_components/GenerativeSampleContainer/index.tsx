import Image from "next/image";
import JanWelcomeTitle from "../JanWelcomeTitle";
import { useEffect, useState } from "react";
import useGetGenerativeSamples from "@/_hooks/useGetGenerativeSamples";

export const GenerativeSampleContainer: React.FC = () => {
  const { data } = useGetGenerativeSamples();
  const [showMore, setShowMore] = useState<string[]>([]);

  useEffect(() => {
    setShowMore(data.slice(0, 6));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
      <JanWelcomeTitle />
      <div className="flex gap-2 flex-col">
        <h2 className="text-xl leading-[25px] tracking-[-0.4px] font-semibold">
          CreateNow
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {showMore.map((item, index) => (
            <img
              style={{ objectFit: "cover", width: "207px", height: "207px" }}
              className="rounded col-span-1 flex flex-col"
              key={index}
              src={item}
              alt=""
            />
          ))}
        </div>
      </div>
      {/* <div className="flex justify-center mt-3 mx-auto">
        <button
          onClick={
            showMore.length === 6
              ? () => setShowMore(data)
              : () => setShowMore(data.slice(0, 6))
          }
          className="flex gap-2 items-center rounded-lg py-2 px-3 bg-gray-200 text-xs leading-[18px] text-gray-800"
        >
          {showMore.length === 6 ? "Show more" : "Show less"}
          <Image
            className={`${showMore.length === 6 ? "" : "rotate-180"}`}
            src={"/icons/unicorn_angle-down.svg"}
            width={16}
            height={16}
            alt=""
          />
        </button>
      </div> */}
    </div>
  );
};
