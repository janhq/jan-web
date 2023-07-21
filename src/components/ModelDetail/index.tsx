import Image from "next/image";
import avatar from "@/assets/Thumbnail02.png";
import { FC, useState } from "react";
import OverviewPane from "@/components/OverviewPane";
import ApiPane from "@/components/ApiPane";

type Props = {
  hidden: boolean;
};

const ModelDetail: FC<Props> = ({ hidden }) => {
  const [tab, setTab] = useState<"overview" | "api">("overview");

  const onTabClick = (clickedTab: "overview" | "api") => {
    if (clickedTab === tab) {
      return;
    }
    setTab(clickedTab);
  };

  return (
    <div
      className={`${
        hidden ? "w-full" : "hidden"
      } flex flex-col gap-[20px] h-full p-5 border-l-[1px] border-[#E5E7EB]`}
    >
      <div className="flex gap-3 items-center">
        <Image src={avatar} width={38} height={38} alt="" />
        <h2 className="test-black font-bold text-[20px] leading-[25px] tracking-[-0.4px]">
          Guanaco
        </h2>
      </div>
      <div className="flex-col gap-6 flex items-center">
        <div className="flex items-center justify-center gap-2 w-[350px]">
          <button
            onClick={() => onTabClick("overview")}
            className={`w-1/2 flex items-center border-b-[1px] justify-center rounded-[4px] py-[6px] px-3 gap-2 ${
              tab === "overview" ? "border-[#111928]" : "border-transparent"
            }`}
          >
            <Image
              src={"/icons/unicorn_exclamation-circle.svg"}
              width={20}
              height={20}
              alt=""
            />
            Overview
          </button>
          <button
            onClick={() => onTabClick("api")}
            className={`w-1/2 flex items-center justify-center rounded-[4px] py-[6px] border-b-[1px] px-3 gap-2 ${
              tab === "api"
                ? "border-b-[1px] border-[#111928]"
                : "border-transparent"
            }`}
          >
            <Image
              src={"/icons/unicorn_arrow.svg"}
              width={20}
              height={20}
              alt=""
            />
            API
          </button>
        </div>
        {tab === "overview" ? <OverviewPane /> : <ApiPane />}
      </div>
    </div>
  );
};

export default ModelDetail;
