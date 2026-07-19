// app/search-results/page.tsx

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  // Destructure with fallbacks
  const { 
    from = 'N/A', 
    to = 'N/A', 
    date = 'N/A', 
    passengers = '1', 
    classType = 'Economy' 
  } = params;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-flyBlue">Available Flights</h1>
          <button className="text-sm font-semibold text-flyOrange hover:underline">
            Modify Search
          </button>
        </div>

        {/* Search Summary Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Route</p>
              <p className="font-bold text-lg text-zinc-900">{from} → {to}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Departure Date</p>
              <p className="font-bold text-lg text-zinc-900">{date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Passengers</p>
              <p className="font-bold text-lg text-zinc-900">{passengers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Class</p>
              <p className="font-bold text-lg text-zinc-900">{classType}</p>
            </div>
          </div>
        </div>

        {/* Placeholder for Flight Cards */}
        <div className="space-y-4">
          <div className="p-8 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
            <p className="text-gray-500">Searching for flights from {from} to {to}...</p>
            {/* Future integration: Map through flight data here */}
          </div>
        </div>
      </div>
    </main>
  );
}