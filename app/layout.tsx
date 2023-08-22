import "./globals.css";
import { Inter } from "next/font/google";
import classNames from "classnames";
import MobileShowcase from "@/_screens/MobileShowcase";
import { Metadata } from "next";
import AuthStatus from "@/_components/AuthStatus";
import SessionProviderWrapper from "@/_components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Free AI Image Generator and Interact with Ai Chat - Jan.ai",
  description:
    "Create unique ai images or chat with open source AI models trained on various models. Run Open Source Ai Models on our GPUs, and make them accessible in one user-friendly app.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || "https://jan.ai"),
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
    <SessionProviderWrapper>
      <html lang="en">
        <body
          className={classNames(
            inter.className,
            "flex flex-col w-full h-screen"
          )}
        >
          <AuthStatus />
          <div className="hidden md:flex flex-col w-full h-screen">
            {children}
          </div>
          <MobileShowcase />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
