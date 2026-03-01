// components/seo/StructuredData.tsx
import Script from 'next/script';

interface StructuredDataProps {
  schema: Record<string, any>;
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <Script
      id={`schema-${Math.random().toString(36).substring(7)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Reusable Schema Generators (You can put these in lib/seo/schema-generators.ts)
export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://waterhardnessscale.com${item.item}`
    }))
  };
};

export const generateArticleSchema = (title: string, desc: string, url: string, dateModified: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": desc,
    "url": `https://waterhardnessscale.com${url}`,
    "publisher": {
      "@type": "Organization",
      "name": "Water Hardness Scale",
      "logo": {
        "@type": "ImageObject",
        "url": "https://waterhardnessscale.com/logo.png"
      }
    },
    "datePublished": "2024-01-01T08:00:00+08:00",
    "dateModified": dateModified,
  };
};