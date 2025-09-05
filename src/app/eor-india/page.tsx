import { EorClient } from "./EorClient";
import { loadSiteSettings } from "@/lib/config";

export default async function EorIndia() {
  const settings = await loadSiteSettings();
  return <EorClient calendlyUrl={settings.calendlyUrl} />;
}


