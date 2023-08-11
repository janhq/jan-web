import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components";
import classNames from "classnames";
import { AuthProvider } from "@/contexts/authContext";
import LoginModal from "@/components/Auth/LoginModal";
import MobileShowcase from "@/screens/MobileShowcase";
import { Metadata } from "next";

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
        className={classNames(inter.className, "flex flex-col w-full h-screen")}
      >
        <div className="hidden md:flex flex-col w-full h-full">
          <AuthProvider>
            <Header />
            {children}
            <LoginModal />
          </AuthProvider>
        </div>
        <MobileShowcase />
      </body>
    </html>
  );
}
