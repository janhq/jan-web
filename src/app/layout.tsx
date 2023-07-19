import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jan: On-Device AI + Cloud AIs",
  description:
    "No subscription needed. Protect your privacy. Use AI without an internet connection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "flex flex-col w-full h-full min-h-screen"
        )}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
