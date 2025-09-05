import { loadSiteSettings } from "@/lib/config";
export async function Header() {
  const settings = await loadSiteSettings();
  return (
    <header className="border-b border-line bg-white">
      <div className="container h-16 flex items-center justify-between">
        <a href="/" className="text-brand-500 hover:text-brand-600 font-semibold">{settings.name}</a>
        <nav className="flex items-center gap-6 text-sm">
          {(settings.navLinks || []).map((l) => (
            <a key={l.href} href={l.href} className="text-text-secondary hover:text-brand-600">{l.label}</a>
          ))}
        </nav>
        <a href="/contact" className="inline-flex items-center justify-center rounded-md bg-cta-500 hover:bg-cta-600 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cta-300">Contact</a>
      </div>
    </header>
  );
}


