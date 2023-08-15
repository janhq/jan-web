"use client";
import React from "react";
import useTracking from "@/_utils/posthog";
import Gleap from "gleap";

export function withAnalytics<P extends Record<string, any>>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {

    const { initAnalytics } = useTracking();
    Gleap.initialize(process.env.NEXT_PUBLIC_GLEAP_API_KEY ?? "");
    initAnalytics();
    
    return <Component {...props} />;
  };
  return WrappedComponent;
}
