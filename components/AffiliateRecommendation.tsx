import { SupportedLanguage } from '@/types';
import affiliateRules from '@/data/affiliate-rules.json';

interface AffiliateProps {
  type: 'hard-water-hero' | 'taste-improver';
  lang: SupportedLanguage;
}

export default function AffiliateRecommendation({ type, lang }: AffiliateProps) {
  // 1. Fetch the product category
  const productCategory = affiliateRules[type];

  // 2. Determine the localized product (fallback to default/English)
  const product = productCategory[lang as keyof typeof productCategory] || productCategory['default'];

  return (
    <a 
      href={product.url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
    >
      View {product.name} on Amazon
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}