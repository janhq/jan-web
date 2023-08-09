import posthog, { Properties } from "posthog-js";

const useTracking = () => {
  const initAnalytics = () => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY || "", {
      api_host: "https://app.posthog.com",
    });
  };
  const identityUser = (id: string) => {
    posthog.identify(id)
  }
  const trackEvent = (event: string, properties?: Properties) => {
    posthog.capture(event, properties);
  };
  return {initAnalytics, identityUser, trackEvent}
};
export default useTracking;
