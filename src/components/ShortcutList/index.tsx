import Image from "next/image";
import React from "react";
import ShortcutItem from "../ShortcutItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/RootStore";

type Props = {
  onShortcutClicked: (id: string) => void;
};

const ShortcutList: React.FC<Props> = observer(({ onShortcutClicked }) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const { availableShortcuts } = useStore();

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
        {availableShortcuts.map(({ name, title, avatarUrl }, index) => (
          <ShortcutItem
            id={name}
            title={title}
            key={index}
            avatar={avatarUrl}
            onClick={onShortcutClicked}
          />
        ))}
      </div>
    </div>
  );
});

export default ShortcutList;
