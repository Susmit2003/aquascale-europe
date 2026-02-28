// components/charts/CityHardnessMap.tsx

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Location } from '@/types'; //

interface CityHardnessMapProps {
  location: Location;
}

export function CityHardnessMap({ location }: CityHardnessMapProps) {
  // Use Geoapify Static API for ultra-fast, free, no-credit-card map generation
  // Requires NEXT_PUBLIC_GEOAPIFY_KEY in your .env.local file
  const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || 'MISSING_KEY';
  
  // Extract coordinates from your database
  const { lat, lng } = location.coords; //
  const zoom = 11;
  
  // Dynamic map marker logic: Red for hard water, Blue for soft
  const isHard = location.hardness_mg_l > 120;
  const markerColor = isHard ? 'ef4444' : '3b82f6'; 
  
  // Construct the Geoapify Static Map URL
  // We use style=osm-bright for a clean, professional look
  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=800&height=400&center=lonlat:${lng},${lat}&zoom=${zoom}&marker=lonlat:${lng},${lat};color:%23${markerColor};size:x-large&apiKey=${GEOAPIFY_KEY}`;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-slate-700" />
        <h3 className="text-xl font-bold text-gray-900 m-0">
          {location.name} Water Quality Zone
        </h3>
      </div>
      
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
        {GEOAPIFY_KEY === 'MISSING_KEY' ? (
           <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-mono text-center px-4">
             [Geoapify Key Required - Add NEXT_PUBLIC_GEOAPIFY_KEY to .env.local]
           </div>
        ) : (
          <Image 
            src={mapUrl}
            alt={`Street map showing the municipal water hardness monitoring zone for ${location.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={false} // Lazy load to protect page speed
          />
        )}
        
        {/* Floating Data Badge over the map */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border border-slate-200">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Monitoring Zone</p>
          <p className="text-lg font-extrabold text-gray-900">{location.name} Municipality</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-3 h-3 rounded-full shadow-sm ${isHard ? 'bg-red-500' : 'bg-blue-500'}`}></span>
            <span className="text-sm font-medium text-slate-800">{location.hardness_mg_l} mg/L CaCO3</span>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-400 mt-3 text-right">
        Powered by <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer" className="underline">Geoapify</a> | Map data © OpenStreetMap contributors
      </p>
    </div>
  );
}