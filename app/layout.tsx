import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css'; // Ensure you have your Tailwind CSS imported here

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
      <body className={`${inter.className} bg-white text-gray-900 flex flex-col min-h-screen`}>
        
        {/* Global Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-blue-600 tracking-tighter">
                AquaScale
              </span>
              <span className="text-sm font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full hidden sm:block">
                Europe
              </span>
            </div>
            <nav className="text-sm font-medium text-gray-500">
              Programmatic SEO Demo
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto py-12 text-center text-gray-500 text-sm">
          <div className="max-w-6xl mx-auto px-4">
            <p className="mb-2">© {new Date().getFullYear()} AquaScale Europe. All rights reserved.</p>
            <p className="max-w-xl mx-auto text-xs text-gray-400">
              Disclaimer: Water hardness values are estimates based on regional municipal data. 
              Always test your water directly before making exact calibrational adjustments to industrial appliances.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}