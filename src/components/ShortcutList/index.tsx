import Image from "next/image";
import React from "react";
import ShortcutItem from "../ShortcutItem";
import { observer } from "mobx-react-lite";
import { Product } from "@/models/Product";

type Props = {
  products: Product[];
};

const ShortcutList: React.FC<Props> = observer(({ products }) => {
  const [expand, setExpand] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setExpand(!expand)}
        className="flex w-full justify-between items-center pb-3"
      >
        <h2 className="text-[#9CA3AF] font-bold text-xs leading-[12px]">
          SHORTCUTS
        </h2>
        <Image
          className={`${expand ? "rotate-180" : "transition"}`}
          src={"/icons/arrow-gray.svg"}
          width={10.25}
          height={6.25}
          alt=""
        />
      </button>
      <div className={`flex flex-col gap-4 ${!expand ? "hidden " : "block"}`}>
        {products.map((product, index) => (
          <ShortcutItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
});

export default ShortcutList;
