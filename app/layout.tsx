// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import Script from 'next/script';
// import './globals.css'; // Ensure you have your Tailwind CSS imported here
// import Link from 'next/link';
// const inter = Inter({ subsets: ['latin'], display: 'swap' });

// export const metadata: Metadata = {
//   title: 'AquaScale Europe | Local Water Hardness Data',
//   description: 'Find exact water hardness levels, appliance settings, and skin-care recommendations for over 50,000 cities across Europe.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <head>
//         {/* 1. Google-Certified CMP (Funding Choices / Privacy & Messaging) */}
//         <Script
//           id="google-cmp"
//           strategy="beforeInteractive"
//           src="https://fundingchoicesmessages.google.com/i/pub-5612991690548352?ers=1"
//         />
        
//         {/* 2. Global AdSense Script */}
//         {/* This will automatically be paused by the CMP above until the user clicks "Accept" */}
//         <Script
//           id="adsbygoogle-init"
//           strategy="afterInteractive"
//           crossOrigin="anonymous"
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5612991690548352"
//         />
//       </head>
//       <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        
//         {/* Global Navigation */}
//        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
//      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//     <div className="flex items-center gap-4">
//       <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">
//         AquaScale <span className="text-gray-900">Europe</span>
//       </Link>
//     </div>
//     <nav className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
      
//       <div className="group relative">
//         <button className="hover:text-blue-600 transition-colors flex items-center gap-1">
//           Calculators ▾
//         </button>
//         <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
//           <Link href="/calculators/limescale" className="block px-4 py-3 hover:bg-gray-50">Limescale Cost Estimator</Link>
//           <Link href="/calculators/roi" className="block px-4 py-3 hover:bg-gray-50">Softener ROI</Link>
//         </div>
//       </div>
//       <Link href="/methodology" className="hover:text-blue-600 transition-colors">Methodology</Link>
//       <Link href="/commercial" className="hover:text-blue-600 transition-colors">Commercial</Link>
//     </nav>
//   </div>
// </header>

//         {/* Main Content */}
//         <div className="flex-grow">
//           {children}
//         </div>

//         {/* Global Footer */}
//        <footer className="bg-slate-900 text-slate-300 mt-auto pt-16 pb-8 border-t-4 border-blue-600">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
    
//     {/* Column 1: Company & Trust */}
//     <div>
//       <h3 className="text-white font-bold text-lg mb-4">AquaScale Europe</h3>
//       <ul className="space-y-3 text-sm">
//         <li><Link href="/en/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
//         <li><Link href="/en/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
       
//         <li><Link href="/en/methodology" className="hover:text-blue-400 transition-colors">Data Methodology</Link></li>
//       </ul>
//     </div>

//     {/* Column 2: Legal & Compliance */}
//     <div>
//       <h3 className="text-white font-bold text-lg mb-4">Legal & Compliance</h3>
//       <ul className="space-y-3 text-sm">
//         <li><Link href="/en/legal/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
//         <li><Link href="/en/legal/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
//         <li><Link href="/en/legal/disclaimer" className="hover:text-blue-400 transition-colors">Medical & Financial Disclaimer</Link></li>
//         <li><Link href="/en/legal/affiliate-disclosure" className="hover:text-blue-400 transition-colors">Affiliate Disclosure</Link></li>
//       </ul>
//     </div>

   

//   </div>

//   {/* Global Legal & Affiliate Disclaimer (Mandatory for AdSense) */}
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 border-t border-slate-800 pt-8 text-center md:text-left">
//     <p className="mb-2 text-slate-400">
//       <strong>Disclaimer:</strong> Water hardness values are estimates based on regional municipal data and digital interpolation. AquaScale Europe is an informational platform. We do not provide financial advice, nor do we guarantee exact appliance lifespans. Always test your water directly before making exact calibrational adjustments to industrial appliances.
//     </p>
//     <p>
//       AquaScale Europe is a participant in affiliate marketing programs. We may earn a commission from qualifying purchases made through links on this site at no extra cost to you.
//     </p>
//     <p className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-2">
//       <span>© {new Date().getFullYear()} AquaScale Europe. All rights reserved.</span>
//       <span className="text-slate-600">Data updated bi-annually.</span>
//     </p>
//   </div>
// </footer>

//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css'; 
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AquaScale Europe | Local Water Hardness Data',
  description: 'Find exact water hardness levels, appliance settings, and skin-care recommendations for over 50,000 cities across Europe.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* 1. Google-Certified CMP (Funding Choices / Privacy & Messaging) */}
        <Script
          id="google-cmp"
          strategy="beforeInteractive"
          src="https://fundingchoicesmessages.google.com/i/pub-5612991690548352?ers=1"
        />
        
        {/* 2. Global AdSense Script */}
        {/* This will automatically be paused by the CMP above until the user clicks "Accept" */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5612991690548352"
        />
      </head>
      <body className={`${inter.className} bg-zinc-50 text-zinc-800 flex flex-col min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900`}>
        
        {/* Global Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-semibold tracking-tighter flex items-center gap-1.5 group">
                <span className="text-sky-700 group-hover:text-sky-800 transition-colors">AquaScale</span>
                <span className="text-zinc-900">Europe</span>
              </Link>
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-600 tracking-tight">
              
              <div className="group relative">
                <button className="hover:text-zinc-900 transition-colors duration-200 flex items-center gap-1.5 py-2">
                  Calculators 
                  <span className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform duration-300">▼</span>
                </button>
                {/* Refined Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/40 rounded-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 translate-y-2 overflow-hidden py-2">
                  <Link href="/calculators/limescale" className="block px-5 py-3 hover:bg-zinc-50 hover:text-sky-700 transition-colors">
                    Limescale Cost Estimator
                  </Link>
                  <Link href="/calculators/roi" className="block px-5 py-3 hover:bg-zinc-50 hover:text-sky-700 transition-colors">
                    Softener ROI Analysis
                  </Link>
                </div>
              </div>
              <Link href="/methodology" className="hover:text-zinc-900 py-2 transition-colors duration-200">Methodology</Link>
              <Link href="/commercial" className="hover:text-zinc-900 py-2 transition-colors duration-200">Commercial</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-grow bg-zinc-50">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-zinc-950 text-zinc-400 mt-auto pt-20 pb-10 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            
            {/* Column 1: Company & Trust */}
            <div>
              <h3 className="text-zinc-100 font-semibold text-lg tracking-tight mb-6">AquaScale Europe</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link href="/en/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
                <li><Link href="/en/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                <li><Link href="/en/methodology" className="hover:text-white transition-colors duration-200">Data Methodology</Link></li>
              </ul>
            </div>

            {/* Column 2: Legal & Compliance */}
            <div>
              <h3 className="text-zinc-100 font-semibold text-lg tracking-tight mb-6">Legal & Compliance</h3>
              <ul className="space-y-4 text-sm font-light">
                <li><Link href="/en/legal/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/en/legal/cookie-policy" className="hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
                <li><Link href="/en/legal/disclaimer" className="hover:text-white transition-colors duration-200">Medical & Financial Disclaimer</Link></li>
                <li><Link href="/en/legal/affiliate-disclosure" className="hover:text-white transition-colors duration-200">Affiliate Disclosure</Link></li>
              </ul>
            </div>
          </div>

          {/* Global Legal & Affiliate Disclaimer (Mandatory for AdSense) */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-xs text-zinc-500 border-t border-zinc-800/60 pt-10 text-center md:text-left font-light leading-relaxed">
            <p className="mb-4 text-zinc-400">
              <strong className="font-medium text-zinc-300">Disclaimer:</strong> Water hardness values are estimates based on regional municipal data and digital interpolation. AquaScale Europe is an informational platform. We do not provide financial advice, nor do we guarantee exact appliance lifespans. Always test your water directly before making exact calibrational adjustments to industrial appliances.
            </p>
            <p className="mb-6">
              AquaScale Europe is a participant in affiliate marketing programs. We may earn a commission from qualifying purchases made through links on this site at no extra cost to you.
            </p>
            <p className="pt-6 border-t border-zinc-800/40 flex flex-col md:flex-row justify-between items-center gap-4">
              <span>© {new Date().getFullYear()} AquaScale Europe. All rights reserved.</span>
              <span className="text-zinc-600 font-medium tracking-wide uppercase">Data updated bi-annually</span>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}