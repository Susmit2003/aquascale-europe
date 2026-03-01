import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // 1. Generate the JSON-LD Schema for Google Rich Snippets
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://waterhardnessscale.com${item.href}`, // Always use absolute URLs for schema
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      {/* Inject Schema into the Head */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Visual Navigation */}
      <ol className="flex flex-wrap items-center text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              {isLast ? (
                <span className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.href} 
                    className="hover:text-blue-600 hover:underline transition-colors capitalize"
                  >
                    {item.label}
                  </Link>
                  <svg 
                    className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}