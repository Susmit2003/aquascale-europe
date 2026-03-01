import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie Policy | Water Hardness Scale' };
export const runtime = 'edge';
export default function CookiePolicyPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 prose prose-blue">
      <h1>Cookie Policy & EU Compliance Statement</h1>
      
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.</p>

      <h2>EU ePrivacy Directive & TCF v2.2 Compliance</h2>
      <p>In accordance with European Union law, we use a Google-certified Consent Management Platform (CMP) to collect and manage your consent regarding the use of cookies and tracking technologies. You were presented with this choice upon your first visit to the site.</p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the basic operation of our platform.</li>
        <li><strong>Analytical Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
        <li><strong>Advertising Cookies:</strong> Used by Google AdSense and our affiliate partners to deliver relevant advertisements.</li>
      </ul>

      <h2>Managing Your Consent</h2>
      <p>You can revoke or modify your cookie consent at any time by clicking the "Privacy & Ad Settings" link at the bottom of our website, which re-opens our Consent Management Platform.</p>
    </main>
  );
}