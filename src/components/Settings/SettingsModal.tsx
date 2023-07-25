import { useAuth } from "@/contexts/auth_context";
import React from "react";

interface SettingsModalProps {
  isOpen: boolean;
  openProfileSetting: () => void;
}

// Displays setting modal in top-right corner once user click on Profile Avatar
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  openProfileSetting,
}) => {
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="flex flex-col absolute top-0 right-0 mt-20 mr-1 w-72 bg-white border border-gray-300 p-2 rounded-lg shadow-md">
      <div
        className="flex flex-col p-3 hover:bg-gray-100 hover:cursor-pointer"
        onClick={openProfileSetting}
      >
        <p className="text-lg mr-1 font-semibold">
          {currentUser?.displayName || "Unknown Name"}
        </p>
        <p className="text-sm text-gray-400">
          {currentUser?.email || "Unknown Email"}
        </p>
      </div>
      <div className="p-3 border-t border-gray-200 hover:bg-gray-100 hover:cursor-pointer">
        <p>Account Settings</p>
      </div>
      <div className="flex flex-row p-3 border-t border-gray-200 hover:bg-gray-100 hover:cursor-pointer">
        <img
          src="/icons/arrow-circle-down.svg"
          alt="Download icon"
          width="16"
          height="16"
        />
        <p className="ml-1">Get the App</p>
      </div>
      <div className="p-3 border-t border-gray-200">
        <p className="-mt-2 text-sm text-gray-500">JOIN OUR COMMUNITIES</p>
        <div className="flex flex-row mt-2 hover:bg-gray-100 hover:cursor-pointer">
          <img
            src="/icons/discord-icon.svg"
            alt="Discord icon"
            width="16"
            height="16"
          />
          <p className="ml-1">Discord</p>
        </div>
        <div className="flex flex-row mt-2 hover:bg-gray-100 hover:cursor-pointer">
          <img
            src="/icons/telegram-icon.svg"
            alt="Telegram icon"
            width="16"
            height="16"
          />
          <p className="ml-1">Telegram</p>
        </div>
        <div className="flex flex-row mt-2 hover:bg-gray-100 hover:cursor-pointer">
          <img
            src="/icons/whatsapp-icon.svg"
            alt="Whatsapp icon"
            width="16"
            height="16"
          />
          <p className="ml-1">WhatsApp</p>
        </div>
      </div>
      <div className="p-3 border-t border-gray-200 hover:bg-gray-100 hover:cursor-pointer">
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default SettingsModal;
