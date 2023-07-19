import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutHome } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jan: On-Device AI + Cloud AIs",
  description: "No subscription needed. Protect your privacy. Use AI without an internet connection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutHome>{children}</LayoutHome>
      </body>
    </html>
  );
}
