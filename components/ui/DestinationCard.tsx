import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface DestinationProps {
  city: string;
  country: string;
  price: string;
  image: string;
}

export default function DestinationCard({ city, country, price, image }: DestinationProps) {
  return (
    // Increased height to h-96 for a larger, more prominent look
    <div className="relative group overflow-hidden rounded-3xl h-96 w-full shadow-lg transition-all hover:shadow-2xl">
      <div className="absolute inset-0">
        <Image 
          src={image} 
          alt={city} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      
      <div className="absolute bottom-8 left-8 right-8 text-white z-10">
        <h3 className="text-3xl font-bold mb-1">{city}</h3>
        <p className="text-lg opacity-90 font-medium mb-3">{country}</p>
        <p className="font-bold text-flyOrange text-xl">From {price}</p>
      </div>
      
      <div className="absolute top-6 right-6 bg-white/10 p-3 rounded-full backdrop-blur-md transition-transform group-hover:translate-x-1 z-10 border border-white/20">
        <ArrowRight className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}