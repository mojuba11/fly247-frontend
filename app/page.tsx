import Navbar from "@/components/layout/Navbar";
import FlightSearchBar from "@/components/ui/FlightSearchBar"; // Updated import
import TopDestinations from "@/components/layout/TopDestinations";
import ExclusiveDeals from "@/components/layout/ExclusiveDeals";
import WhyChooseUs from "@/components/layout/WhyChooseUs";
import BannerSlider from "@/components/layout/BannerSlider";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation Component */}
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section className="relative w-full pt-32 pb-48 px-4 text-center overflow-visible">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/firstsection.png')" }}
        />
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Explore the World with Fly247
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl">
            Your journey begins here. Fast, reliable, and affordable.
          </p>
        </div>

        {/* Floating Search Bar Component - Positioned to overlap the hero section */}
        <div className="relative z-20 w-full max-w-5xl mx-auto -mb-24 px-4">
          <FlightSearchBar />
        </div>
      </section>

      {/* Top Destinations Section - Added margin-top to clear the floating search bar */}
      <div className="mt-32">
        <TopDestinations />
      </div>

      {/* Exclusive Deals Section */}
      <ExclusiveDeals />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Banner Slider Section */}
      <BannerSlider />
      
      {/* Footer Section */}
      <Footer />
    </main>
  );
}