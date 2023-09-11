import React from "react";
import UserProfileDropDown from "../UserProfileDropDown";
import LoginButton from "../LoginButton";
import HamburgerButton from "../HamburgerButton";

const Header: React.FC = () => (
  <header className="flex border-b-[1px] border-gray-200 p-3 dark:bg-gray-800">
    <nav className="flex-1 justify-center">
      <HamburgerButton />
    </nav>
    <LoginButton />
    <UserProfileDropDown />
  </header>
);

export default Header;
