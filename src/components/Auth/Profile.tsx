import React, { useRef } from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/contexts/auth_context";
import { useStore } from "../../models/RootStore";

interface ProfileProps {
  // Parent component can inject a function to close this modal once the close button is clicked
  closeProfileFunc: () => void;
  logoutCallBack: () => void;
  isOpen: boolean;
}

/**
 * Modal to display user's profile details
 * @param param0
 * @returns
 */
const Profile: React.FC<ProfileProps> = ({
  isOpen,
  logoutCallBack,
  closeProfileFunc,
}) => {
  const { historyStore } = useStore();
  const { currentUser, handleSignOut } = useAuth();
  const sharingURLTextRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    try {
      let copyText = sharingURLTextRef.current?.placeholder || "";
      console.log();
      let isCopy = copy(copyText);
      if (isCopy) {
        toast.info("URL is copied to Clipboard");
      }
    } catch (error) {}
  };

  const onSignOutClick = () => {
    handleSignOut();
    historyStore.clearAllConversations();
    logoutCallBack();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center bg-black z-50">
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="relative flex justify-center items-center flex-col w-[283px] h-[430px] bg-white p-2 rounded-lg shadow-2xl">
        {/* Exit button */}
        <Image
          className="absolute top-0 right-0 mt-[5px] mr-[5px] p-2"
          src="/icons/close_modal_btn.png"
          alt="Close button"
          width={28}
          height={28}
          priority
          onClick={closeProfileFunc}
        />
        {/** Profile image */}
        <div className="flex justify-center items-center mt-8">
          <div className="relative">
            <div
              className="relative rounded-full overflow-hidden"
              style={{ width: "60px", height: "60px" }}
            >
              <img
                src={currentUser?.photoURL || "/icons/app_icon.svg"}
                alt={"Profile Image"}
                className="rounded-full"
              />
            </div>
            <Image
              className="absolute bottom-0 right-0 w-1/3 h-auto"
              src="/icons/upload_photo.svg"
              alt="Edit text button"
              width={18}
              height={18}
              priority
            />
          </div>
        </div>
        {/** Name */}
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex flex-row">
            <p className="text-base mr-1">
              {currentUser?.displayName || "Unknown Name"}
            </p>
            <Image
              src="/icons/edit_text.svg"
              alt="Edit text button"
              width={18}
              height={18}
              priority
            />
          </div>
          <p className="text-xs text-gray-400">
            {currentUser?.email || "Unknown Email"}
          </p>
        </div>
        {/** Functional editors */}
        <div className="flex flex-col mt-10 flex-grow">
          <div className="flex flex-row text-gray-700 items-center hover:bg-gray-100 hover:cursor-pointer">
            <div className="w-[24px] h-[24px] bg-[#FF9500] rounded-full flex justify-center items-center">
              <Image
                src="/icons/share_with_friend_btn.svg"
                alt="Share button"
                width={15}
                height={15}
                priority
              />
            </div>
            <p className="ml-1">Tell a friend</p>
          </div>
          <div className="flex flex-row justify-between mt-3">
            <input
              ref={sharingURLTextRef}
              type="text"
              className="bg-gray-100 px-4 py-1 rounded placeholder-gray-500 text-gray-900 border border-gray-300 mr-1"
              placeholder="https://jan.ai"
              disabled
            />
            <Image
              className="hover:bg-gray-100 hover:cursor-pointer"
              src="/icons/copy.svg"
              alt="Coppy button"
              width={28}
              height={28}
              priority
              onClick={copyToClipboard}
            />
          </div>
          <div
            className="flex flex-row mt-3 text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
            onClick={onSignOutClick}
          >
            <Image
              src="/icons/unicorn_exit.svg"
              alt="Logout button"
              width={20}
              height={20}
              priority
            />
            <p className="ml-1">Log out</p>
          </div>
          <div className="flex flex-row mt-3 text-gray-500 hover:bg-gray-100 hover:cursor-pointer">
            <Image
              src="/icons/trash_bin.svg"
              alt="Delete button"
              width={20}
              height={20}
              priority
            />
            <p className="ml-1">Delete Account</p>
          </div>
        </div>
        {/** Bottom section */}
        <div className="flex flex-row justify-between pl-4 pr-4 items-center hover:cursor-pointer">
          <p className="text-gray-500 hover:text-gray-800">
            <a
              href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>
          </p>
          <p className="text-center font-bold text-2xl pb-3 ml-2 mr-2">.</p>
          <p className="text-gray-500 hover:text-gray-800">
            <a
              href={process.env.NEXT_PUBLIC_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
