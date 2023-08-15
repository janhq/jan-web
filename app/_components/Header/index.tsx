"use client";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "../../_contexts/authContext";
import { usePathname } from "next/navigation";
import SignInModal from "../SignInModal";
import MobileMenuPane from "../MobileMenuPane";
import ConfirmSignOutModal from "../ConfirmSignOutModal";
import useSignOut from "@/_hooks/useSignOut";
import { ThemeChanger } from "../ChangeTheme";
import UserProfileDropDown from "../UserProfileDropDown";

export const navigation = [
  { name: "Products", href: "/chat" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "About", href: "/about" },
];

const Header: React.FC = () => {
  const router = usePathname();
  const { currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const { signOut } = useSignOut();

  const checkLink = (link: string, router: string) => {
    return link.includes(router);
  };

  const isUserLoggedIn = currentUser != null && !currentUser.isAnonymous;

  return (
    <header
      id="header"
      className="text-sm bg-white border-b-[1px] border-gray-200 relative w-full py-3 px-6 dark:bg-gray-800"
    >
      <nav className="mx-auto flex items-center" aria-label="Global">
        <div className="flex items-center flex-1 justify-center">
          {navigation.map((item) => (
            <div
              key={item.name}
              className={`px-3 py-1 flex gap-2 rounded-lg ${
                checkLink(router || "", item.href)
                  ? "bg-[#E5E7EB] text-[#1F2A37]"
                  : "text-[#9CA3AF] bg-transparent"
              }`}
            >
              <Link href={item.href} className="text-sm leading-5">
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeChanger />
          {isUserLoggedIn ? (
            <UserProfileDropDown
              onLogOutClick={() => setShowLogOutModal(true)}
            />
          ) : (
            <button onClick={() => setShowLoginModal(true)}>Login</button>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <SignInModal open={showLoginModal} setOpen={setShowLoginModal} />
      <ConfirmSignOutModal
        open={showLogOutModal}
        setOpen={setShowLogOutModal}
        onConfirm={signOut}
      />
      <MobileMenuPane open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
    </header>
  );
};

export default Header;
