import DestinationCard from "@/components/ui/DestinationCard";

export default function TopDestinations() {
  const destinations = [
    { city: "Paris", country: "France", price: "₦620,000", image: "/images/paris.jpg" },
    { city: "Dubai", country: "UAE", price: "₦450,000", image: "/images/dubai.jpg" },
    { city: "London", country: "United Kingdom", price: "₦580,000", image: "/images/london.jpg" },
    { city: "New York", country: "USA", price: "₦710,000", image: "/images/nyc.jpg" },
  ];

  return (
    // Added -mt-10 to pull the section up towards the search bar
    <section className="-mt-20 pt-0 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-flyBlue text-sm font-bold uppercase tracking-wider bg-blue-50 px-4 py-1 rounded-full">
          Popular Destinations
        </span>
        <h2 className="text-4xl font-extrabold text-zinc-900 mt-4">Top Destinations</h2>
        <p className="text-gray-600 mt-2">Explore some of the most popular destinations around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest, index) => (
          <DestinationCard 
            key={index} 
            city={dest.city} 
            country={dest.country} 
            price={dest.price} 
            image={dest.image} 
          />
        ))}
      </div>
    </section>
  );
}