// 'use client';

// import { useEffect, useRef } from 'react';

// interface AdUnitProps {
//   slot: string;
//   format?: 'auto' | 'fluid' | 'rectangle';
//   responsive?: boolean;
//   minHeight?: string; // Critical for preventing Cumulative Layout Shift (CLS)
// }

// export default function AdUnit({ 
//   slot, 
//   format = 'auto', 
//   responsive = true, 
//   minHeight = '280px' // Standard minimum height for responsive display ads
// }: AdUnitProps) {
//   const adRef = useRef<HTMLModElement>(null);

//   useEffect(() => {
//     try {
//       // Ensure we only push the ad once per component mount
//       if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
//         // @ts-ignore
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//       }
//     } catch (error) {
//       console.error('AdSense error:', error);
//     }
//   }, []);

//   return (
//     <div 
//       className="w-full flex justify-center my-8 overflow-hidden bg-gray-50/50 rounded-lg border border-gray-100/50"
//       style={{ minHeight }} // PREVENTS LAYOUT SHIFT PENALTIES
//       aria-hidden="true" // Hides ad container noise from screen readers
//     >
//       <ins
//         ref={adRef}
//         className="adsbygoogle w-full"
//         style={{ display: 'block' }}
//         data-ad-client="ca-pub-5612991690548352"
//         data-ad-slot={slot}
//         data-ad-format={format}
//         data-full-width-responsive={responsive.toString()}
//       />
//     </div>
//   );
// }


'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  minHeight?: string; 
}

export default function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  minHeight = '280px' 
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only push the ad if it hasn't been initialized yet
    if (!initialized.current) {
      initialized.current = true;
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error: any) {
        // Suppress the harmless "adsbygoogle.push() error: No slot size" 
        // that frequently happens during Next.js client-side navigation
        if (error.message && error.message.includes('No slot size')) {
          console.warn('AdSense: Suppressed slot size error during navigation');
        } else {
          console.error('AdSense error:', error);
        }
      }
    }
  }, [slot]); // Added slot to dependency array so it updates if the ad slot changes

  return (
    <div 
      // Removed 'my-8' so the parent component controls spacing
      className="w-full flex justify-center overflow-hidden bg-zinc-50/50 rounded-xl border border-zinc-100/50"
      style={{ minHeight }} 
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className="adsbygoogle w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5612991690548352"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}