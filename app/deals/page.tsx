"use client";
import Navbar from "@/components/layout/Navbar"; // Inherit the homepage header
import DestinationCard from "@/components/ui/DestinationCard";

export default function DealsPage() {
  const deals = [
    { city: "London", country: "United Kingdom", price: "₦580,000", image: "/london.jpg" },
    { city: "Dubai", country: "UAE", price: "₦450,000", image: "/dubai.jpg" },
    { city: "Paris", country: "France", price: "₦620,000", image: "/paris.jpg" },
    { city: "New York", country: "USA", price: "₦710,000", image: "/nyc.jpg" },
    { city: "Tokyo", country: "Japan", price: "₦950,000", image: "/tokyo.jpg" },
    { city: "Cape Town", country: "South Africa", price: "₦520,000", image: "/capetown.jpg" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Inherited Header Menu */}
      <Navbar />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Highlighted Header Section */}
          <div className="text-center mb-16 bg-white p-12 rounded-3xl shadow-sm border border-blue-100">
            <span className="text-flyBlue font-bold uppercase tracking-[0.2em] text-sm bg-blue-100 px-6 py-2 rounded-full">
              Limited Time Offers
            </span>
            <h2 className="text-5xl font-extrabold text-flyBlue mt-8 mb-6">
              Exclusive Travel Deals
            </h2>
            <div className="w-24 h-1.5 bg-flyOrange mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Discover hand-picked destinations with premium services at unbeatable prices.
            </p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <DestinationCard 
                key={index} 
                city={deal.city} 
                country={deal.country} 
                price={deal.price} 
                image={deal.image} 
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}