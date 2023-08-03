"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Provider, RootInstance, initializeStore } from "../models/RootStore";
import { AuthProvider } from "@/contexts/auth_context";
import Gleap from "gleap";

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

  useEffect(() => {
    Gleap.initialize(process.env.NEXT_PUBLIC_GLEAP_API_KEY || "");
  }, []);

  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "flex flex-col w-full h-full min-h-screen"
        )}
      >
        {store && (
          <Provider value={store.current}>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        )}
      </body>
    </html>
  );
}
