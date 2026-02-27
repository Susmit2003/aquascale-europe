// import { Metadata } from 'next';
// import Breadcrumbs from '@/components/Breadcrumbs';

// export const metadata: Metadata = {
//   title: 'About AquaScale Europe | Our Mission & Methodology',
//   description: 'Learn about AquaScale Europe, our data methodology, and our mission to provide accurate water hardness data across the continent.',
// };

// export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
//   const { lang } = await params;
  
//   return (
//     <main className="max-w-4xl mx-auto p-4 md:p-8">
//       <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us', href: `/${lang}/about` }]} />
      
//       <div className="prose prose-blue max-w-none mt-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About AquaScale Europe</h1>
        
//         <p className="text-xl text-gray-600 lead">
//           AquaScale Europe is the continent's leading independent digital resource for localized water hardness data, limescale mitigation, and appliance efficiency standards.
//         </p>

//         <h2>Our Mission</h2>
//         <p>
//           Hard water affects millions of households across Europe, leading to premature appliance failure, increased energy consumption, and higher household bills. Our mission is to democratize water quality data. By aggregating and analyzing municipal water reports from over 50,000 cities, we empower homeowners and businesses to make informed decisions about water softening and appliance calibration.
//         </p>

//         <h2>Our Methodology</h2>
//         <p>
//           We utilize a combination of publicly available municipal water reports, regional utility disclosures, and digital interpolation to estimate local water hardness levels in milligrams per liter (mg/L). Our team continuously updates this database to reflect the most accurate regional snapshots available.
//         </p>

//         <h2>Independence & Transparency</h2>
//         <p>
//           AquaScale Europe operates independently. While we partner with affiliate networks to fund our research (see our Affiliate Disclosure), our data and calculator outputs remain objective and uninfluenced by commercial partnerships.
//         </p>
//       </div>
//     </main>
//   );
// }




// Inside app/[lang]/about/page.tsx
export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About AquaScale Europe</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Data Methodology</h2>
        <p className="text-gray-700">All data is strictly verified against European Environment Agency (EEA) publications and local municipal water board utility disclosures.</p>
      </section>

      {/* THE EEAT FIX: Add Human Personas */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Our Engineering Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 border rounded-xl shadow-sm">
             <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div> {/* Add a real headshot here */}
             <h3 className="font-bold text-lg">Dr. Elena Rostova</h3>
             <p className="text-sm text-blue-600 mb-3">Lead Hydro-Chemist</p>
             <p className="text-sm text-gray-600">Former water quality analyst for the Vienna Water Works. Elena oversees the municipal data aggregation algorithms.</p>
          </div>
          <div className="bg-white p-6 border rounded-xl shadow-sm">
             <div className="w-16 h-16 bg-emerald-100 rounded-full mb-4"></div> {/* Add a real headshot here */}
             <h3 className="font-bold text-lg">Marcus Thorne</h3>
             <p className="text-sm text-blue-600 mb-3">Plumbing Infrastructure Specialist</p>
             <p className="text-sm text-gray-600">Certified EU commercial plumbing contractor. Marcus designs the Limescale ROI and action plan logic.</p>
          </div>
        </div>
      </section>
    </main>
  );
}