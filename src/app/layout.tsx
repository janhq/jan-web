"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import classNames from "classnames";
import { Provider, initializeStore } from "../models/RootStore";

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

  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "flex flex-col w-full h-full min-h-screen"
        )}
      >
        <Provider value={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
