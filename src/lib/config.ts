import { fetchSiteSettings } from "@/lib/contentful";
import { siteSettings as fallback } from "@/lib/tempData";

export async function loadSiteSettings() {
  const fromCf = await fetchSiteSettings();
  return {
    name: fromCf?.siteName || fallback.name,
    calendlyUrl: fromCf?.calendlyUrl || fallback.calendlyUrl,
    navLinks: fromCf?.navLinks || fallback.navLinks,
  };
}


