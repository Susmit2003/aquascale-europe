import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy | waterhardness Europe' };
export const runtime = 'edge';
export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 prose prose-blue">
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
      
      <p>waterhardness ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed in compliance with the General Data Protection Regulation (GDPR).</p>

      <h2>1. Information We Collect</h2>
      <p>When you visit Water Hardness Scale, we may collect:</p>
      <ul>
        <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time spent on the site via analytics tools.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to personalize content and ads, provide social media features, and analyze our traffic.</li>
      </ul>

      <h2>2. Google AdSense & The DoubleClick Cookie</h2>
      <p>We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site.</p>
      <ul>
        <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
        <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
      </ul>

      <h2>3. Your GDPR Rights</h2>
      <p>If you are a resident of the European Economic Area (EEA), you have the right to:</p>
      <ul>
        <li>Access, update, or delete the information we have on you.</li>
        <li>Object to our processing of your Personal Data.</li>
        <li>Withdraw your consent at any time via our Cookie Consent Management Platform (CMP) located at the bottom of the screen.</li>
      </ul>

      <h2>4. Contact Us</h2>
      <p>For any privacy-related questions or data deletion requests, please contact our Data Protection Officer at privacy@aquascale-europe.com.</p>
    </main>
  );
}