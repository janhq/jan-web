"use client";
import "./globals.css";
import { useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Provider, RootInstance, initializeStore } from "../models/RootStore";
import { AuthProvider } from "@/contexts/auth_context";
import Gleap from "gleap";
import { SidebarLeft } from "@/components/SidebarLeft";
import { AdvancedPrompt } from "@/components/AdvancedPrompt";
import Header from "@/components/Header";
import { CompactSideBar } from "@/components/CompactSideBar";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

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
            <AuthProvider>
              <ThemeProvider enableSystem={true} attribute="class">
                <div className="flex w-full h-screen">
                  <div className="flex h-screen">
                    <SidebarLeft />
                    <CompactSideBar />
                    <AdvancedPrompt />
                  </div>
                  <div className="flex flex-col flex-1 h-screen">
                    <Header />
                    <div className="w-full h-full flex-1 overflow-x-hidden">
                      {children}
                    </div>
                  </div>
                </div>
              </ThemeProvider>
            </AuthProvider>
          </Provider>
        )}
      </body>
    </html>
  );
}
