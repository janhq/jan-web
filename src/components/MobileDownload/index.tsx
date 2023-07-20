import React from "react";
import Image from "next/image";

const DOWNLOAD_IOS = "https://apps.apple.com/vn/app/jan/id6449664703";
const DOWNLOAD_ANDROID = "https://apps.apple.com/vn/app/jan/id6449664703";

const MobileDownload = () => {
  return (
    <>
      <div className="flex items-center flex-col box-border h-48 w-80 rounded-lg p-4 border-2 border-gray-200">
        <Image src="/icons/janai_logo.svg" alt={""} width={32} height={32} objectFit="contain" />
        <b>Jan Mobile</b>
        <p className="font-light text-[12px] text-center">
          Stay up to date and move work forward with Jan on iOS & Android. Download the app today.
        </p>

        <div className="flex w-full mt-6 justify-between">
          <a href={DOWNLOAD_IOS} target="_blank" rel="noopener noreferrer">
            <div className="flex box-border w-[135px] h-11 rounded-md bg-gray-300 p-2 items-center hover:bg-gray-200 focus:bg-gray-600">
              <Image src="/icons/apple_logo.svg" alt={""} width={26} height={26} objectFit="contain" />
              <div className="ml-2">
                <p className="text-[10px]">Download on the</p>
                <p className="text-[12px] font-bold">AppStore</p>
              </div>
            </div>
          </a>
          <a href={DOWNLOAD_ANDROID} target="_blank" rel="noopener noreferrer">
            <div className="flex box-border w-[135px] h-11 rounded-md bg-gray-300 p-2 items-center hover:bg-gray-200 focus:bg-gray-600">
              <Image src="/icons/google_play_logo.svg" alt={""} width={26} height={26} objectFit="contain" />
              <div className="ml-2">
                <p className="text-[10px]">Download on the</p>
                <p className="text-[12px] font-bold">Google Play</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileDownload;
