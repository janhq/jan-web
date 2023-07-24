"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth_context";

const navigation = [
  { name: "Chat", icon: "/icons/chat.svg", href: "/chat" },
  { name: "AIs", icon: "/icons/brain.svg", href: "/ai" },
];

interface HeaderProps {
  handleClickLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleClickLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, firebaseToken } = useAuth();

  return (
    <header className="text-sm bg-white border-b-[1px] border-gray-200 ">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex space-x-5 items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              className="h-8 w-auto"
              src="/icons/app_icon.svg"
              alt=""
              width={32}
              height={32}
            />
            <span className="font-bold">Jan</span>
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-base leading-6 text-gray-900"
            >
              <div className="flex items-center">
                <Image
                  src={item.icon}
                  alt={"nav"}
                  width={16}
                  height={16}
                  className="m-2"
                />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
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
        <div className="hidden lg:flex">
          <div className="flex items-center gap-5">
            <Link
              className="flex gap-2 cursor-pointer"
              href={process.env.NEXT_PUBLIC_DISCORD_INVITATION_URL || ""}
              target="_blank_"
            >
              <Image src={"/icons/discord.svg"} width={20} height={20} alt="" />
            </Link>
            {currentUser ? (
              <button className="flex items-center gap-4">
                <img
                  className="rounded-sm w-8 aspect-square"
                  alt="avatar"
                  src={currentUser?.photoURL || "/icons/app_icon.svg"}
                />
                {currentUser?.displayName || "Jan"}
              </button>
            ) : (
              <div className="flex justify-center">
                {/* <button
                  className="w-24 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-md mr-2"
                  onClick={handleClickLogin}
                >
                  Sign up
                </button> */}
                <button
                  className="w-24 h-8 bg-black hover:bg-gray-700 text-white rounded-md"
                  onClick={handleClickLogin}
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                width={32}
                height={32}
                src="/icons/app_icon.svg"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
