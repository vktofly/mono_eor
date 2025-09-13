"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <StructuredData 
        type="breadcrumb" 
        data={{ items: breadcrumbItems }} 
      />
      
      {/* Visual Breadcrumbs */}
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-gray-900">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
