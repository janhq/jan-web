"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { useRef, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import classNames from "classnames";
import { Provider, RootInstance, initializeStore } from "../models/RootStore";
import { AuthProvider } from "@/contexts/auth_context";
import LoginModal from "@/components/Auth/LoginModal";
import SettingsModal from "@/components/Settings/SettingsModal";
import Profile from "@/components/Auth/Profile";
import Gleap from "gleap";
import posthog from "posthog-js";
import Tracking from "@/utils/posthog";
import useTracking from "@/utils/posthog";

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
  const store = useRef<RootInstance>(initializeStore());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { initAnalytics } = useTracking();

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  // On/Off Setting Modal
  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingModal);
  };

  // Open once user click to avatar on Header
  const openSettingModal = () => {
    setShowProfileModal(true);
  };

  // Called once your click to the exit button
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  // Called once user click logout from menu or profile page
  const logoutCallBack = () => {
    closeProfileModal();
    toggleSettingsModal();
  };

  useEffect(() => {
    Gleap.initialize(process.env.NEXT_PUBLIC_GLEAP_API_KEY || "");
    initAnalytics();
  }, []);

  return (
    <html lang="en">
      <body
        className={classNames(inter.className, "flex flex-col w-full h-screen")}
      >
        {store && (
          <Provider value={store.current}>
            <AuthProvider>
              <Header
                handleClickLogin={toggleLoginModal}
                toggleDisplaySettingMenu={toggleSettingsModal}
              />
              {children}
              <LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
              <SettingsModal
                isOpen={showSettingModal}
                setOpen={setShowSettingsModal}
                openSettingFunc={openSettingModal}
                logoutCallBack={logoutCallBack}
              />
              <Profile
                isOpen={showProfileModal}
                closeProfileFunc={closeProfileModal}
                logoutCallBack={logoutCallBack}
              />
            </AuthProvider>
          </Provider>
        )}
      </body>
    </html>
  );
}
