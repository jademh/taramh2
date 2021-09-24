declare global {
  interface Window {
    gtag: any;
  }
}

export default function trackEvent(
  eventCategory: string,
  eventAction: string,
  eventLabel: string
) {
  if (process.env.NODE_ENV === "production") {
    window.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  } else {
    console.log(
      `DEVELOPMENT MODE: Custom Tracking Event - ${eventCategory}, ${eventAction}, ${eventLabel}`
    );
  }
}
