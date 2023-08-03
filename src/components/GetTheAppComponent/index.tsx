import Link from "next/link";
import React from "react";
import Image from "next/image";

const GetTheAppComponent: React.FC = () => {
  return (
    <div className="flex flex-row border-t border-gray-200 p-3 justify-between">
      <button>
        <span className="text-gray-900 text-sm font-normal">Get the app</span>
      </button>
      <Link
        className="flex gap-2 cursor-pointer items-center"
        href={process.env.NEXT_PUBLIC_DISCORD_INVITATION_URL || ""}
        target="_blank_"
      >
        <Image src={"/icons/discord.svg"} width={20} height={20} alt="" />
        <span className="text-purple-900 font-semibold text-sm">Discord</span>
      </Link>
    </div>
  );
};

export default React.memo(GetTheAppComponent);
