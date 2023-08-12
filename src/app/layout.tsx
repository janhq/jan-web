import "./globals.css";
import { Inter } from "next/font/google";
import classNames from "classnames";
import MobileShowcase from "@/screens/MobileShowcase";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Free AI Image Generator and Interact with Ai Chat - Jan.ai",
  description:
    "Create unique ai images or chat with open source AI models trained on various models. Run Open Source Ai Models on our GPUs, and make them accessible in one user-friendly app.",
  openGraph: {
    images: "/images/preview.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(inter.className, "flex flex-col w-full h-screen")}
      >
        <div className="hidden md:flex flex-col w-full h-screen">
          {children}
        </div>
        <MobileShowcase />
      </body>
    </html>
  );
}
