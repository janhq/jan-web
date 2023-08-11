import React from "react";
import { Metadata } from "next";
import { Home } from "@/screens/Home";

export const metadata: Metadata = {
  title: "Free AI Image Generator and Interact with Ai Chat - Jan.ai",
  description:
    "Create unique ai images or chat with open source AI models trained on various models. Run Open Source Ai Models on our GPUs, and make them accessible in one user-friendly app.",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Home/>
    </main>
  );
}
