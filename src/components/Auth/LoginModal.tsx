"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";

interface LoginModalProps {}

/**
 * Modal of signing in with Google and other Authentication Provider
 * @returns
 */
const LoginModal: React.FC<LoginModalProps> = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { showLogin, handleSignInWithGoogle, setShowLogin } = useAuth();

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowLogin(false);
    }
  };

  if (!showLogin) return null;

  // Handling sign in with Google & Firebase
  const signInWithGoole = async () => {
    try {
      await handleSignInWithGoogle(() => {
        setShowLogin(false);
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
      className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 flex justify-center items-center bg-black z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="flex w-96 items-center flex-col bg-white p-6 rounded-lg shadow-2xl"
      >
        <Image
          src="/icons/janai_logo.svg"
          alt={"Jan logo"}
          width={64}
          height={64}
          style={{ objectFit: "contain" }}
        />
        <h2 className="text-lg mt-6 mx-4 text-black font-semibold text-center">
          Login to continue
        </h2>
        <div className="mt-4 w-full">
          <button
            className="text-sm flex items-center justify-center h-10 w-full py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
            onClick={signInWithGoole}
          >
            <Image
              className="w-6 h-6 mr-2"
              src="/icons/social_icon_google.svg"
              alt="Google Logo"
              width={180}
              height={37}
              priority
              style={{ objectFit: "contain" }}
            />
            Continue with Google
          </button>
          {/* <button
            className="text-sm mt-2 flex items-center justify-center h-10 w-full py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
            onClick={signinWithApple}
          >
            <Image
              className="w-6 h-6 mr-2"
              src="/icons/social_icon_apple.svg"
              alt="Apple Logo"
              width={180}
              height={37}
              priority
              style={{ objectFit: "contain" }}
            />
            Continue with Apple
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
