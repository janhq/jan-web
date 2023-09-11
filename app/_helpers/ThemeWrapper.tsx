"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// TODO: consider this one. This caused the error Warning: Extra attributes from the server: class,style at html
export const ThemeWrapper: React.FC<Props> = ({ children }) => (
  <ThemeProvider enableSystem={false} attribute="class">
    {children}
  </ThemeProvider>
);
