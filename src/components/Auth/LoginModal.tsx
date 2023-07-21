"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../services/firebase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal of signing in with Google and other Authentication Provider
 * @returns
 */
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Handling sign in with Google & Firebase
  const signInWithGoole = () => {
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      signInWithPopup(firebaseAuth, googleAuthProvider).then(async (result) => {
        const user = result.user as any;
        console.log("firebase token: ", user.accessToken);
        // Call backend to validate the token, or store it in local storage
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling sign in with Apple
  const signinWithApple = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center bg-opacity-50 bg-black z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="flex justify-center items-center flex-col w-[383px] h-[288px] bg-white p-6 rounded-lg shadow-2xl"
      >
        <Image src="/icons/janai_logo.svg" alt={""} width={64} height={64} objectFit="contain" />
        <h2 className="text-lg mt-2 mx-4 text-black font-semibold text-center">Login to continue</h2>
        <button
          className="text-sm mt-4 flex items-center justify-center px-10 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          onClick={signInWithGoole}
        >
          <Image
            className="w-6 h-6 mr-2"
            src="/icons/google_logo.svg"
            alt="Google Logo"
            width={180}
            height={37}
            priority
          />
          Continue with Google
        </button>
        <button
          className="text-sm mt-2 flex items-center justify-center px-11 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          onClick={signinWithApple}
        >
          <Image
            className="w-6 h-6 mr-2"
            src="/icons/apple_logo.svg"
            alt="Apple Logo"
            width={180}
            height={37}
            priority
          />
          Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
