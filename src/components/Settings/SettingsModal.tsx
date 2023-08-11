import { useAuth } from "@/contexts/authContext";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import React from "react";

interface SettingsModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  openSettingFunc: () => void;
  logoutCallBack: () => void;
}

// Displays setting modal in top-right corner once user click on Profile Avatar
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  setOpen,
  openSettingFunc: openProfileSetting,
  logoutCallBack,
}) => {
  const { currentUser, handleSignOut } = useAuth();

  if (!isOpen) return null;

  const handlSignOutClick = () => {
    handleSignOut();
    logoutCallBack();
  };

  return (
    <Dialog
      className="absolute inset-0 w-screen h-screen z-100"
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col absolute top-0 right-0 mt-20 mr-1 w-60 bg-white border border-gray-300 p-2 rounded-lg shadow-md">
        <Dialog.Panel>
          <div
            className="group flex flex-col p-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            onClick={() => {
              setOpen(false);
              openProfileSetting();
            }}
          >
            <p className="text-lg mr-1 font-semibold">
              {currentUser?.displayName || "Unknown Name"}
            </p>
            <p className="text-sm text-gray-400 group-hover:text-gray-500">
              {currentUser?.email || "Unknown Email"}
            </p>
          </div>
          {/* <div className="p-3 border-t border-gray-200 text-gray-500 hover:bg-gray-100 hover:cursor-pointer">
            <p>Account Settings</p>
          </div> */}
          <div className="flex flex-row p-3 border-t border-gray-200 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
            <img
              src="/icons/arrow-circle-down.svg"
              alt="Download icon"
              width="16"
              height="16"
            />
            <p className="ml-1">
              <a
                href={process.env.NEXT_PUBLIC_DOWNLOAD_APP_IOS || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the App
              </a>
            </p>
          </div>
          {/* <div className="border-t border-gray-200">
            <p className="pl-3 mt-3 text-gray-500">Join Our Community</p>
            <div className="flex flex-row pl-3 pt-3 pb-3 hover:bg-gray-100 hover:cursor-pointer">
              <img
                src="/icons/discord-icon.svg"
                alt="Discord icon"
                width="16"
                height="16"
              />
              <p className="ml-1 text-gray-500">
                <a
                  href={process.env.NEXT_PUBLIC_DISCORD_INVITATION_URL || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </p>
            </div>
          </div> */}
          <div className="border-t border-gray-200 text-gray-500">
            <div className="pl-3 pt-2 pb-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
              <Link
                href="/privacy"
                onClick={() => setOpen(false)}
                rel="noopener noreferrer"
              >
                Privacy
              </Link>
            </div>
            <div className="pl-3 pt-2 pb-2 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
              <Link
                href="/support"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
          <div
            className="pt-3 pb-1 pl-3 border-t border-gray-200 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            onClick={handlSignOutClick}
          >
            <p>Sign Out</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SettingsModal;
