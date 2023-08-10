import React from "react";
import Image from "next/image";
import { Popover } from "@headlessui/react";
import { MenuHeader } from "../MenuHeader";
import { useAuth } from "../../contexts/auth_context";

type Props = {
  onLogOutClick: () => void;
};

const UserProfileDropDown: React.FC<Props> = ({ onLogOutClick }) => {
  const { currentUser } = useAuth();
  return (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-2 outline-none">
          <Image
            className="rounded-sm w-8 aspect-square"
            src={currentUser?.photoURL || "/icons/app_icon.svg"}
            width={32}
            height={32}
            alt=""
          />
          <div className="flex flex-col justify-start">
            <h2 className="text-sm leading-5 text-[#111928] dark:text-gray-400">
              {currentUser?.displayName || "Guest"}
            </h2>
          </div>
        </Popover.Button>
        <MenuHeader onLogOutClick={onLogOutClick} />
      </Popover>
    </Popover.Group>
  );
};

export default UserProfileDropDown;
