"use client";
import { useEffect, useState } from "react";

const CONSENT_KEY = "monohr_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (!v) setVisible(true);
    } catch {}
  }, []);

  function acceptAll() {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, ts: Date.now() }));
    } catch {}
    setVisible(false);
    window.dispatchEvent(new Event("monohr-consent-change"));
  }

  function rejectAll() {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, ts: Date.now() }));
    } catch {}
    setVisible(false);
    window.dispatchEvent(new Event("monohr-consent-change"));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur border-t border-line">
      <div className="container py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">We use cookies to analyze traffic and improve your experience. You can accept or reject analytics cookies.</p>
        <div className="flex items-center gap-2">
          <button onClick={rejectAll} className="inline-flex items-center justify-center rounded-md border border-line bg-white text-text-primary px-4 py-2 text-sm">Reject</button>
          <button onClick={acceptAll} className="inline-flex items-center justify-center rounded-md bg-cta-500 hover:bg-cta-600 text-white px-4 py-2 text-sm">Accept</button>
        </div>
      </div>
    </div>
  );
}

export function getAnalyticsConsent(): boolean {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (!v) return false;
    const p = JSON.parse(v);
    return Boolean(p.analytics);
  } catch {
    return false;
  }
}


