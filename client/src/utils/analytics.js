import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Initialize GA4
export const initGA = () => {
  const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!MEASUREMENT_ID) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    send_page_view: false // We'll handle this manually
  });

  window.gtag = gtag;
};

// Hook for tracking page views
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title
    });
  }, [location]);
};

// Event tracking helper
export const trackEvent = (category, action, label = null, value = null) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Common events
export const trackConversion = (type, value = null) => {
  trackEvent('conversion', type, null, value);
};

export const trackCTAClick = (ctaText, destination) => {
  trackEvent('engagement', 'cta_click', `${ctaText} -> ${destination}`);
};

export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form', success ? 'submit_success' : 'submit_error', formName);
};