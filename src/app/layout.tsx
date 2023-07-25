"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import classNames from "classnames";
import { Provider, initializeStore } from "../models/RootStore";
import { AuthProvider } from "@/contexts/auth_context";
import LoginModal from "@/components/Auth/LoginModal";
import SettingsModal from "@/components/Settings/SettingsModal";
import Profile from "@/components/Auth/Profile";

const inter = Inter({ subsets: ["latin"] });

// TODO: Comment below because client side rendering does not support
// export const metadata: Metadata = {
//   title: "Jan: On-Device AI + Cloud AIs",
//   description:
//     "No subscription needed. Protect your privacy. Use AI without an internet connection",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = initializeStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingModal);
  };

  const openProfileSetting = () => {
    setShowProfileModal(true);
  };

  const closeProfileSetting = () => {
    setShowProfileModal(false);
  };

  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "flex flex-col w-full h-full min-h-screen"
        )}
      >
        <Provider value={store}>
          <AuthProvider>
            <Header
              handleClickLogin={toggleLoginModal}
              toggleDisplaySettingMenu={toggleSettingsModal}
            />
            {children}
            <LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
            <SettingsModal
              isOpen={showSettingModal}
              openProfileSetting={openProfileSetting}
            />
            <Profile
              isOpen={showProfileModal}
              closeProfileFunc={closeProfileSetting}
            />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
