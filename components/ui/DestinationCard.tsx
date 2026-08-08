'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plane } from 'lucide-react';

interface DestinationProps {
  city: string;
  country: string;
  price: string | number;
  image: string;
}

export default function DestinationCard({ city, country, price, image }: DestinationProps) {
  // Format price if passed as a number or string amount
  const formattedPrice = typeof price === 'number' 
    ? `₦${price.toLocaleString()}` 
    : price.startsWith('₦') || price.startsWith('$') 
    ? price 
    : `₦${price}`;

  return (
    <Link href={`/flight?to=${encodeURIComponent(city)}`} className="block group">
      <div className="relative group overflow-hidden rounded-3xl h-96 w-full shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="absolute inset-0">
          <Image 
            src={image || '/images/default-destination.jpg'} 
            alt={city} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        
        {/* Content Info */}
        <div className="absolute bottom-8 left-8 right-8 text-white z-10">
          <h3 className="text-3xl font-black mb-1">{city}</h3>
          <p className="text-sm opacity-90 font-medium mb-3 uppercase tracking-wider">{country}</p>
          <div className="flex items-center justify-between">
            <p className="font-black text-flyOrange text-xl">From {formattedPrice}</p>
          </div>
        </div>
        
        {/* Floating Arrow Icon */}
        <div className="absolute top-6 right-6 bg-white/10 p-3 rounded-full backdrop-blur-md transition-transform group-hover:translate-x-1 z-10 border border-white/20 text-white">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}
