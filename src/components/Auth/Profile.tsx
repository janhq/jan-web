import React from "react";
import Image from "next/image";

interface ProfileProps {
  // Parent component can inject a function to close this modal once the close button is clicked
  closeProfileFunc: () => void;
}

/**
 * Modal to display user's profile details
 * @param param0
 * @returns
 */
const Profile: React.FC<ProfileProps> = ({ closeProfileFunc }) => {
  return (
    <div className="relative flex flex-col w-[283px] h-[430px] rounded-lg shadow-2xl p-4">
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
          <div className="relative rounded-full overflow-hidden" style={{ width: "50px", height: "50px" }}>
            <Image
              src={"/images/dummy_profile_img.jpg"}
              alt={"Profile Image"}
              layout="fill"
              objectFit="cover"
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
          <p className="text-base mr-1">Engerraund Serac</p>
          <Image src="/icons/edit_text.svg" alt="Edit text button" width={18} height={18} priority />
        </div>
        <p className="text-xs text-gray-400">serac@ai.com</p>
      </div>
      {/** Functional editors */}
      <div className="flex flex-col mt-10 flex-grow">
        <div className="flex flex-row text-gray-700 items-center">
          <div className="w-[24px] h-[24px] bg-[#FF9500] rounded-full flex justify-center items-center">
            <Image src="/icons/share_with_friend_btn.svg" alt="Share button" width={15} height={15} priority />
          </div>
          <p className="ml-1">Tell a friend</p>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <input
            type="text"
            className="bg-gray-100 px-4 py-1 rounded placeholder-gray-500 text-gray-900 border border-gray-300"
            placeholder="https://jan.ai"
          />
          <Image src="/icons/copy_clipboard.svg" alt="Coppy button" width={28} height={28} priority />
        </div>
        <div className="flex flex-row mt-3 text-gray-500">
          <Image src="/icons/logout_btn.svg" alt="Logout button" width={20} height={20} priority />
          <p className="ml-1">Log out</p>
        </div>
        <div className="flex flex-row mt-3 text-gray-500">
          <Image src="/icons/delete_btn.svg" alt="Delete button" width={20} height={20} priority />
          <p className="ml-1">Delete Account</p>
        </div>
      </div>
      {/** Bottom section */}
      <div className="flex flex-row justify-between pl-4 pr-4 mb-2 text-gray-500 items-center">
        <p className="pl-6">Privacy</p>
        <p className="text-center font-bold text-2xl pb-3">.</p>
        <p className="pr-6">Support</p>
      </div>
    </div>
  );
};

export default Profile;
