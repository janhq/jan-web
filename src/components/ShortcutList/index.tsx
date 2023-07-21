import Image from "next/image";
import React from "react";
import ShortcutItem from "../ShortcutItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/RootStore";
import { Product } from "@/models/Product";

type Props = {
  products: Product[];
  onShortcutClicked: (id: string) => void;
};

const ShortcutList: React.FC<Props> = observer(
  ({ products, onShortcutClicked }) => {
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
          {products.map((product, index) => (
            <ShortcutItem
              id={product.name}
              title={product.decoration.title}
              key={index}
              avatar={product.decoration.images[0]}
              onClick={onShortcutClicked}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default ShortcutList;
