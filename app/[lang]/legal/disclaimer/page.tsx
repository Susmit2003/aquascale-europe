import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Legal Disclaimer | AquaScale Europe' };

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 prose prose-blue">
      <h1>General Disclaimer</h1>
      
      <h2>1. Financial & Calculation Disclaimer</h2>
      <p>The "Annual Limescale Cost Estimator," "Softener ROI Calculator," and all other financial projections provided on AquaScale Europe are <strong>estimates only</strong>. They are based on generalized municipal data, average energy prices, and standard appliance thermodynamics.</p>
      <p>We are not financial advisors. Your actual energy bills, repair costs, and water softener payback periods will vary based on your specific usage, appliance age, and precise home water chemistry. We do not guarantee any specific financial savings.</p>

      <h2>2. Medical & Health Disclaimer</h2>
      <p>Content related to the effects of hard water on skin conditions (e.g., eczema, dermatitis) or hair health is for <strong>informational purposes only</strong>. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or a qualified dermatologist with any questions regarding a medical condition.</p>

      <h2>3. Data Accuracy Disclaimer</h2>
      <p>While we strive to keep our database of 50,000+ European cities up-to-date, municipal water sources and treatment methods change frequently. The mg/L values displayed are estimations. <strong>Always perform a physical water test</strong> at your tap before making precise calibrational adjustments to sensitive industrial or home appliances.</p>
    </main>
  );
}