"use client";
import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { usePathname } from "next/navigation";
import { MenuHeader } from "../MenuHeader";
import SignInModal from "../SignInModal";
import MobileMenuPane from "../MobileMenuPane";
import ConfirmSignOutModal from "../ConfirmSignOutModal";
import useSignOut from "../../hooks/useSignOut";

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

  return (
    <header className="text-sm bg-white border-b-[1px] border-gray-200 relative w-full py-3 px-6">
      <nav className="mx-auto flex items-center" aria-label="Global">
        <div className="flex items-center flex-1 justify-center">
          {navigation.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-1 flex gap-2 rounded-lg ${
                checkLink(router, item.href)
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
          {currentUser == null || currentUser.isAnonymous ? (
            <button onClick={() => setShowLoginModal(true)}>Login</button>
          ) : (
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
                    <h2 className="text-sm leading-5 text-[#111928]">
                      {currentUser?.displayName || "Guest"}
                    </h2>
                  </div>
                </Popover.Button>
                <MenuHeader onLogOutClick={() => setShowLogOutModal(true)} />
              </Popover>
            </Popover.Group>
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
