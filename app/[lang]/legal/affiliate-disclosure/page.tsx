import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Affiliate Disclosure | AquaScale Europe' };

export default function AffiliateDisclosurePage() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 prose prose-blue">
      <h1>Affiliate Disclosure</h1>
      
      <p>Transparency and honesty are core values at AquaScale Europe. To comply with European consumer protection laws and Federal Trade Commission (FTC) guidelines, please read our affiliate disclosure.</p>

      <h2>How We Fund Our Platform</h2>
      <p>AquaScale Europe is a free informational resource. To maintain our servers, continuously update our data API, and pay our development team, we participate in various affiliate marketing programs.</p>

      <h2>What is an Affiliate Link?</h2>
      <p>When you click on links to various merchants on this site (such as Amazon, local plumbing suppliers, or water softener manufacturers) and make a purchase, this can result in this site earning a commission. <strong>This occurs at absolutely no additional cost to you.</strong></p>

      <h2>Our Editorial Promise</h2>
      <p>Our participation in affiliate programs does not influence our water hardness data, our calculator outputs, or our educational guides. We only recommend products (such as specific water softeners or testing kits) that we believe provide genuine value to households dealing with hard water.</p>

      <p>If you have any questions about our affiliations, please contact us.</p>
    </main>
  );
}