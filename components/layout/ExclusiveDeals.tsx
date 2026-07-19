export default function ExclusiveDeals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto bg-flyBlue rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="text-white text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Flight Deals</h2>
          <p className="text-blue-100 opacity-90">
            Subscribe to get special offers, travel tips and more delivered to your inbox.
          </p>
        </div>

        {/* Subscription Input */}
        <div className="bg-white p-2 rounded-2xl w-full max-w-md flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-4 py-3 rounded-xl focus:outline-none text-zinc-900"
          />
          <button className="bg-flyOrange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
            Subscribe
          </button>
        </div>
        
      </div>
    </section>
  );
}