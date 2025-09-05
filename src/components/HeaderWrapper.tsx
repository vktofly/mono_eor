"use client";
import { useEffect, useState } from "react";
import { Header } from "./Header";

interface SiteSettings {
  name: string;
  navLinks: Array<{
    label: string;
    href: string;
    submenu?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export function HeaderWrapper() {
  const [settings, setSettings] = useState<SiteSettings>({
    name: "MonoHR",
    navLinks: [
      { label: "Home", href: "/" },
      { 
        label: "Services", 
        href: "#",
        submenu: [
          { label: "EOR India", href: "/" },
          { label: "Contractor Management", href: "/contractor-management-india" },
        ]
      },
      { label: "Pricing", href: "/pricing" },
      { 
        label: "Resources", 
        href: "#",
        submenu: [
          { label: "Resources Hub", href: "/resources" },
          { label: "About Us", href: "/about" },
        ]
      },
    ],
  });

  useEffect(() => {
    // Load settings from API or config
    const loadSettings = async () => {
      try {
        // You can fetch from an API endpoint here if needed
        // const response = await fetch('/api/settings');
        // const data = await response.json();
        // setSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
        // Use default settings
      }
    };

    loadSettings();
  }, []);

  return <Header settings={settings} />;
}
