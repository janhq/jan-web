"use client";
import React from "react";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../services/firebase";

/**
 * Modal of signing in with Google and other Authentication Provider
 * @returns 
 */
const LoginModal = () => {
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
    <>
      <div className="mt-10 flex justify-center items-center flex-col w-80 rounded-lg shadow-2xl h-auto p-6">
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
    </>
  );
};

export default LoginModal;
