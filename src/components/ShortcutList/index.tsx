import Image from "next/image";
import React from "react";
import avartar from "@/assets/Thumbnail02.png";
import ShortcutItem from "../ShortcutItem";

type Props = {
  onShortcutClicked: (id: string) => void;
};

const ShortcutList: React.FC<Props> = ({ onShortcutClicked }) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const datas = [
    {
      id: "chatgpt",
      title: "ChatGPT",
      avatar: avartar.src,
    },
    {
      id: "chatgpt",
      title: "Guanaco",
      avatar: avartar.src,
    },
    {
      id: "chatgpt",
      title: "OpenJourney",
      avatar: avartar.src,
    },
    {
      id: "chatgpt",
      title: "Dreamshaper",
      avatar: avartar.src,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setExpand(!expand)}
        className="flex w-full justify-between items-center pb-3"
      >
        <h2 className="text-[#9CA3AF] font-bold text-[12px] leading-[12px]">
          SHORTCUTS
        </h2>
        <Image
          className={`${expand ? "rotate-180" : "transition"}`}
          src={"/icons/unicorn_angle-down.svg"}
          width={24}
          height={24}
          alt=""
        />
      </button>
      <div className={`flex flex-col gap-4 ${!expand ? "hidden " : "block"}`}>
        {datas.map(({ id, title, avatar }, index) => (
          <ShortcutItem
            id={id}
            title={title}
            key={index}
            avatar={avatar}
            onClick={onShortcutClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortcutList;
