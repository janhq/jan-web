"use client"
import { useCallback } from "react";
import Image from "next/image";
import { useStore } from "@/models/RootStore";
import { observer } from "mobx-react-lite";
import { MenuAdvancedPrompt } from "../MenuAdvancedPrompt";

export const AdvancedPrompt: React.FC = observer(() => {
  const { historyStore } = useStore();

  const onAdvancedPrompt = useCallback(() => {
    historyStore.toggleAdvancedPrompt();
  }, []);
  return (
    <div
      className={`${
        historyStore.showAdvancedPrompt ? "w-[288px]" : "hidden"
      } h-screen flex flex-col border-r border-gray-200`}
    >
      <button
        onClick={onAdvancedPrompt}
        className="flex items-center mx-2 mt-3 mb-[10px] flex-none gap-1 text-xs leading-[18px] text-[#6B7280]"
      >
        <Image src={"/icons/chevron-left.svg"} width={20} height={20} alt="" />
        <span className="font-semibold text-gray-500 text-xs">
          BASIC PROMPT
        </span>
      </button>
      <div className="flex flex-col justify-start flex-1 p-3 gap-[10px] overflow-x-hidden">
        <MenuAdvancedPrompt />
      </div>

      <div className="py-3 px-2 flex flex-none gap-3 items-center justify-between border-t border-gray-200">
        <button className="w-1/2 flex items-center text-gray-900 py-2 px-3 rounded-lg gap-1 justify-center bg-gray-100 text-sm leading-5">
          <Image
            src={"/icons/unicorn_arrow-random.svg"}
            width={16}
            height={16}
            alt=""
          />
          Random
        </button>
        <button className="w-1/2 flex items-center text-gray-900 justify-center py-2 px-3 rounded-lg gap-1 bg-yellow-300 text-sm leading-5">
          Generate
        </button>
      </div>
    </div>
  );
});
