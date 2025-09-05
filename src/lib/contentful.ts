import { createClient, type Entry } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_CDA_TOKEN;
const env = process.env.CONTENTFUL_ENV || "master";

export function getCfClient() {
  if (!space || !token) return null;
  return createClient({ space, accessToken: token, environment: env });
}

export type SiteSettings = {
  siteName?: string;
  calendlyUrl?: string;
  navLinks?: Array<{ label: string; href: string }>;
};

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const client = getCfClient();
  if (!client) return null;
  try {
    const res = await client.getEntries<{ siteName: string; calendlyUrl?: string; navLinks?: Array<{ label: string; href: string }> }>({
      content_type: "siteSettings",
      limit: 1,
    });
    const item = res.items[0] as Entry<Record<string, unknown>> | undefined;
    if (!item) return null;
    const fields = item.fields as Record<string, unknown>;
    return { siteName: fields.siteName, calendlyUrl: fields.calendlyUrl, navLinks: fields.navLinks };
  } catch {
    return null;
  }
}


