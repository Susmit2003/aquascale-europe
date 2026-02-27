import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About AquaScale Europe | Our Mission & Methodology',
  description: 'Learn about AquaScale Europe, our data methodology, and our mission to provide accurate water hardness data across the continent.',
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us', href: `/${lang}/about` }]} />
      
      <div className="prose prose-blue max-w-none mt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About AquaScale Europe</h1>
        
        <p className="text-xl text-gray-600 lead">
          AquaScale Europe is the continent's leading independent digital resource for localized water hardness data, limescale mitigation, and appliance efficiency standards.
        </p>

        <h2>Our Mission</h2>
        <p>
          Hard water affects millions of households across Europe, leading to premature appliance failure, increased energy consumption, and higher household bills. Our mission is to democratize water quality data. By aggregating and analyzing municipal water reports from over 50,000 cities, we empower homeowners and businesses to make informed decisions about water softening and appliance calibration.
        </p>

        <h2>Our Methodology</h2>
        <p>
          We utilize a combination of publicly available municipal water reports, regional utility disclosures, and digital interpolation to estimate local water hardness levels in milligrams per liter (mg/L). Our team continuously updates this database to reflect the most accurate regional snapshots available.
        </p>

        <h2>Independence & Transparency</h2>
        <p>
          AquaScale Europe operates independently. While we partner with affiliate networks to fund our research (see our Affiliate Disclosure), our data and calculator outputs remain objective and uninfluenced by commercial partnerships.
        </p>
      </div>
    </main>
  );
}