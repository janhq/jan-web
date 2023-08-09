import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileShowcase = () => {
  return (
    <div className="md:hidden flex flex-col px-5 mt-10 items-center justify-center w-full gap-10">
      <Image
        src="/images/mobile.jpg"
        width={638}
        height={892}
        alt="mobile"
        className="w-full h-full"
        style={{ objectFit: "contain" }}
      />
      <div className="flex flex-col items-center justify-center mb-20">
        <Image
          src="/icons/app_icon.svg"
          width={200}
          height={200}
          className="w-[10%]"
          alt="logo"
        />
        <span className="text-[22px] font-semibold">Download Jan App</span>
        <p className="text-center text-sm text-gray-500">
          <span>Stay up to date and move work forward with Jan on iOS</span>
          <span>& Android. Download the app today.</span>
        </p>
        <div className="flex justify-between items-center gap-3 mt-5">
          <div className="bg-[#E5E7EB] rounded-[8px] gap-3 p-2 flex items-center">
            <Image src={"/icons/apple.svg"} width={26} height={26} alt="" />
            <div className="flex flex-col">
              <span className="text-[8px] leading-[12px]">Download on the</span>
              <h2 className="font-bold text-[12px] leading-[15px]">AppStore</h2>
            </div>
          </div>
          <div className="bg-[#E5E7EB] rounded-[8px] gap-3 p-2 flex items-center">
            <Image
              src={"/icons/googleplay.svg"}
              width={26}
              height={26}
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-[8px] leading-[12px]">Download on the</span>
              <h2 className="font-bold text-[12px] leading-[15px]">
                Google Play
              </h2>
            </div>
          </div>
        </div>
        <Link
          href={process.env.NEXT_PUBLIC_DISCORD_INVITATION_URL || ""}
          target="_blank_"
        >
          <div className="flex flex-row space-x-2 items-center justify-center rounded-[18px] px-2 h-[36px] bg-[#E2E5FF] mt-5">
            <Image
              src="icons/discord-icon.svg"
              width={24}
              height={24}
              className=""
              alt=""
            />
            <span className="text-[#5865F2]">Join our Discord Community</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileShowcase;
