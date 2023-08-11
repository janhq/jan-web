"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    redirect("/chat");
  }, []);
  return <div></div>;
};
