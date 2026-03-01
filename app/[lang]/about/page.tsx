// import { Metadata } from 'next';
// import Breadcrumbs from '@/components/Breadcrumbs';

// export const metadata: Metadata = {
//   title: 'About Water Hardness Scale | Our Mission & Methodology',
//   description: 'Learn about Water Hardness Scale, our data methodology, and our mission to provide accurate water hardness data across the continent.',
// };

// export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
//   const { lang } = await params;
  
//   return (
//     <main className="max-w-4xl mx-auto p-4 md:p-8">
//       <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us', href: `/${lang}/about` }]} />
      
//       <div className="prose prose-blue max-w-none mt-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Water Hardness Scale</h1>
        
//         <p className="text-xl text-gray-600 lead">
//           Water Hardness Scale is the continent's leading independent digital resource for localized water hardness data, limescale mitigation, and appliance efficiency standards.
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
//           Water Hardness Scale operates independently. While we partner with affiliate networks to fund our research (see our Affiliate Disclosure), our data and calculator outputs remain objective and uninfluenced by commercial partnerships.
//         </p>
//       </div>
//     </main>
//   );
// }




// // Inside app/[lang]/about/page.tsx
// export default function AboutPage() {
//   return (
//     <main className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-bold mb-6">About Water Hardness Scale</h1>
      
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-4">Our Data Methodology</h2>
//         <p className="text-gray-700">All data is strictly verified against European Environment Agency (EEA) publications and local municipal water board utility disclosures.</p>
//       </section>

//       {/* THE EEAT FIX: Add Human Personas */}
//       <section>
//         <h2 className="text-2xl font-bold mb-6">Our Engineering Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 border rounded-xl shadow-sm">
//              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div> {/* Add a real headshot here */}
//              <h3 className="font-bold text-lg">Dr. Elena Rostova</h3>
//              <p className="text-sm text-blue-600 mb-3">Lead Hydro-Chemist</p>
//              <p className="text-sm text-gray-600">Former water quality analyst for the Vienna Water Works. Elena oversees the municipal data aggregation algorithms.</p>
//           </div>
//           <div className="bg-white p-6 border rounded-xl shadow-sm">
//              <div className="w-16 h-16 bg-emerald-100 rounded-full mb-4"></div> {/* Add a real headshot here */}
//              <h3 className="font-bold text-lg">Marcus Thorne</h3>
//              <p className="text-sm text-blue-600 mb-3">Plumbing Infrastructure Specialist</p>
//              <p className="text-sm text-gray-600">Certified EU commercial plumbing contractor. Marcus designs the Limescale ROI and action plan logic.</p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



// Inside app/[lang]/about/page.tsx
export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12 font-sans text-zinc-800">
      
      {/* Header Section */}
      <header className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tighter mb-6">
          About Water Hardness Scale
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
          We are an independent data initiative dedicated to mapping and analyzing municipal water hardness across the European continent.
        </p>
      </header>
      
      {/* Methodology Block */}
      <section className="bg-zinc-50/80 p-8 md:p-12 rounded-2xl md:rounded-[2rem] border border-zinc-100 mb-20 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight mb-5">
          Our Data Methodology
        </h2>
        <p className="text-zinc-600 font-light leading-relaxed text-lg max-w-3xl">
          All data is strictly verified against <strong className="font-medium text-zinc-800">European Environment Agency (EEA)</strong> publications and local municipal water board utility disclosures. We standardize complex regional measurements into a unified, actionable format.
        </p>
      </section>

      {/* THE EEAT FIX: Human Personas */}
      <section>
        <div className="mb-10 border-b border-zinc-100 pb-5">
          <h2 className="text-3xl font-semibold text-zinc-900 tracking-tight">
            Our Engineering Team
          </h2>
          <p className="text-zinc-500 font-light mt-3">
            The technical experts behind our aggregation models and financial logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Persona 1: Hydro-Chemist */}
          <div className="bg-white p-8 md:p-10 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-100/50 transition-all duration-300 group">
             <div className="w-20 h-20 bg-sky-50 border border-sky-100 rounded-full mb-6 flex items-center justify-center text-sky-700 font-semibold text-2xl tracking-tighter shadow-inner group-hover:scale-105 transition-transform duration-300">
               {/* Replace with actual <img> tag for real headshots */}
               ER
             </div>
             <h3 className="font-semibold text-zinc-900 text-2xl tracking-tight mb-1">
               Dr. Elena Rostova
             </h3>
             <p className="text-sm font-medium text-sky-600 mb-5 tracking-wide uppercase">
               Lead Hydro-Chemist
             </p>
             <p className="text-zinc-600 font-light leading-relaxed">
               Former water quality analyst for the Vienna Water Works. Elena oversees the municipal data aggregation algorithms and cross-references them against independent physical titrations.
             </p>
          </div>
          
          {/* Persona 2: Infrastructure Specialist */}
          <div className="bg-white p-8 md:p-10 rounded-2xl md:rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-100/50 transition-all duration-300 group">
             <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full mb-6 flex items-center justify-center text-emerald-700 font-semibold text-2xl tracking-tighter shadow-inner group-hover:scale-105 transition-transform duration-300">
               {/* Replace with actual <img> tag for real headshots */}
               MT
             </div>
             <h3 className="font-semibold text-zinc-900 text-2xl tracking-tight mb-1">
               Marcus Thorne
             </h3>
             <p className="text-sm font-medium text-emerald-600 mb-5 tracking-wide uppercase">
               Plumbing Infrastructure
             </p>
             <p className="text-zinc-600 font-light leading-relaxed">
               Certified EU commercial plumbing contractor. Marcus designs the Limescale ROI logic and ensures our actionable recommendations meet current European building codes.
             </p>
          </div>

        </div>
      </section>
      
    </main>
  );
}