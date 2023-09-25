"use client";
import { ProductsProps } from "@/services/products";
import useTracking from "@/utils/posthog";
import Gleap from "gleap";
import React from "react";

export function withAnalytics<P extends Record<string, any>>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {

    const { initAnalytics } = useTracking();
    Gleap.initialize(process.env.NEXT_PUBLIC_GLEAP_API_KEY || "");
    initAnalytics();
    
    return <Component {...props} />;
  };
  return WrappedComponent;
}
