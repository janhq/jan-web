import { useAuth } from "../../_contexts/authContext";
import { DefaultUser } from "@/_models/User";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  onLogOutClick: () => void;
};

const menu = [
  {
    icon: "ic_api.svg",
    title: "API",
  },
  {
    icon: "ic_dashboard.svg",
    title: "Dashboard",
  },
  {
    icon: "ic_billing.svg",
    title: "Billing",
  },
  {
    icon: "ic_member.svg",
    title: "Members",
  },
];

export const MenuHeader: React.FC<Props> = ({ onLogOutClick }) => {
  const { currentUser } = useAuth();

  const displayName = currentUser?.displayName ?? DefaultUser.displayName;
  const email = currentUser?.email ?? "";

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute  shadow-profile -right-2 top-full z-10 mt-3 w-[224px] overflow-hidden rounded-[6px] bg-white shadow-lg ring-1 ring-gray-200">
        <div className="py-3 px-4 gap-2 flex flex-col">
          <h2 className="text-[20px] leading-[25px] tracking-[-0.4px] font-bold text-[#111928]">
            {displayName}
          </h2>
          <span className="text-[#6B7280] leading-[17.5px] text-sm">
            {email}
          </span>
        </div>
        <hr />
        <div className="flex flex-col py-3 px-[15px]">
          <ul className="flex flex-col gap-4">
            {menu.map((item, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Image
                  className="rounded"
                  src={`/icons/${item.icon}`}
                  width={28}
                  height={28}
                  alt=""
                />
                <span className="text-gray-600 text-base">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <button
          onClick={onLogOutClick}
          className="px-4 py-3 text-sm w-full text-left text-gray-700"
        >
          Sign Out
        </button>
        <hr />
        <div className="flex gap-2 px-4 py-2 justify-center">
          <Link href="/privacy">
            <span className="text-[#6B7280] text-xs">Privacy</span>
          </Link>
          <Image src={"/icons/ico_Ellipse.svg"} width={3} height={3} alt="" />
          <Link href="/support">
            <span className="text-[#6B7280] text-xs">Support</span>
          </Link>
        </div>
      </Popover.Panel>
    </Transition>
  );
};
