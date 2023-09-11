"use client";

import { showingMobilePaneAtom } from "@/_helpers/JotaiWrapper";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import React from "react";

const HamburgerButton: React.FC = () => {
  const setShowingMobilePane = useSetAtom(showingMobilePaneAtom);
  return (
    <button
      type="button"
      className="self-end inline-flex items-center justify-center rounded-md p-1 text-gray-700 lg:hidden"
      onClick={() => setShowingMobilePane(true)}
    >
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default React.memo(HamburgerButton);
