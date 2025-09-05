import { EorClient } from "./eor-india/EorClient";
import { loadSiteSettings } from "@/lib/config";

export default async function Home() {
  const settings = await loadSiteSettings();
  return <EorClient calendlyUrl={settings.calendlyUrl} />;
}
