import React from "react";
import { Popover } from "@headlessui/react";
import { MenuHeader } from "../MenuHeader";
import useGetCurrentUser from "@/_hooks/useGetCurrentUser";

type Props = {
  onLogOutClick: () => void;
};

const UserProfileDropDown: React.FC<Props> = ({ onLogOutClick }) => {
  const { loading, user } = useGetCurrentUser();

  if (loading || !user) {
    return <div></div>;
  }

  return (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-2 outline-none">
          <img
            className="rounded-sm w-8 aspect-square"
            src={
              user.avatarUrl ??
              `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/app_icon.svg`
            }
            alt=""
          />
          <div className="flex flex-col justify-start">
            <h2 className="text-sm leading-5 text-[#111928] dark:text-gray-400">
              {user.displayName}
            </h2>
          </div>
        </Popover.Button>
        <MenuHeader onLogOutClick={onLogOutClick} />
      </Popover>
    </Popover.Group>
  );
};

export default UserProfileDropDown;
