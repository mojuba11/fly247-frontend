"use client";



import { useState, FormEvent } from 'react';

import { useRouter } from 'next/navigation';



export default function HeroSearchBox() {

  const router = useRouter();

  const [searchData, setSearchData] = useState({

    from: '',

    to: '',

    date: '',

    passengers: '1',

    classType: 'Economy'

  });



  const handleSearch = (e: FormEvent) => {

    e.preventDefault(); // Prevents the form from refreshing the page



    // 1. Validation

    if (!searchData.from || !searchData.to) {

      alert("Please enter both origin and destination.");

      return;

    }



    // 2. Construct the query string

    const query = new URLSearchParams({

      from: searchData.from,

      to: searchData.to,

      date: searchData.date,

      passengers: searchData.passengers,

      classType: searchData.classType,

    }).toString();



    // 3. Perform Navigation

    router.push(`/search-results?${query}`);

  };



  return (

    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto -mt-10 border border-gray-100">

      {/* Wrapped in a form to ensure reliable event handling */}

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

       

        {/* Origin */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">From</label>

          <input

            type="text"

            placeholder="City"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.from}

            onChange={(e) => setSearchData({...searchData, from: e.target.value})}

          />

        </div>



        {/* Destination */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">To</label>

          <input

            type="text"

            placeholder="City"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.to}

            onChange={(e) => setSearchData({...searchData, to: e.target.value})}

          />

        </div>



        {/* Date */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">Date</label>

          <input

            type="date"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.date}

            onChange={(e) => setSearchData({...searchData, date: e.target.value})}

          />

        </div>



        {/* Passengers */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">Passengers</label>

          <select

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900 bg-white"

            value={searchData.passengers}

            onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}

          >

            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}

          </select>

        </div>



        {/* Search Button */}

        <button

          type="submit" // Changed to submit so it triggers the form onSubmit

          className="bg-flyOrange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all cursor-pointer"

        >

          Search

        </button>

      </form>

    </div>

  );

}"use client";



import { useState, FormEvent } from 'react';

import { useRouter } from 'next/navigation';



export default function HeroSearchBox() {

  const router = useRouter();

  const [searchData, setSearchData] = useState({

    from: '',

    to: '',

    date: '',

    passengers: '1',

    classType: 'Economy'

  });



  const handleSearch = (e: FormEvent) => {

    e.preventDefault(); // Prevents the form from refreshing the page



    // 1. Validation

    if (!searchData.from || !searchData.to) {

      alert("Please enter both origin and destination.");

      return;

    }



    // 2. Construct the query string

    const query = new URLSearchParams({

      from: searchData.from,

      to: searchData.to,

      date: searchData.date,

      passengers: searchData.passengers,

      classType: searchData.classType,

    }).toString();



    // 3. Perform Navigation

    router.push(`/search-results?${query}`);

  };



  return (

    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto -mt-10 border border-gray-100">

      {/* Wrapped in a form to ensure reliable event handling */}

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

       

        {/* Origin */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">From</label>

          <input

            type="text"

            placeholder="City"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.from}

            onChange={(e) => setSearchData({...searchData, from: e.target.value})}

          />

        </div>



        {/* Destination */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">To</label>

          <input

            type="text"

            placeholder="City"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.to}

            onChange={(e) => setSearchData({...searchData, to: e.target.value})}

          />

        </div>



        {/* Date */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">Date</label>

          <input

            type="date"

            required

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900"

            value={searchData.date}

            onChange={(e) => setSearchData({...searchData, date: e.target.value})}

          />

        </div>



        {/* Passengers */}

        <div className="flex flex-col gap-2">

          <label className="text-sm font-semibold text-flyBlue">Passengers</label>

          <select

            className="p-3 border rounded-lg border-gray-200 focus:outline-flyOrange text-zinc-900 bg-white"

            value={searchData.passengers}

            onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}

          >

            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}

          </select>

        </div>



        {/* Search Button */}

        <button

          type="submit" // Changed to submit so it triggers the form onSubmit

          className="bg-flyOrange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all cursor-pointer"

        >

          Search

        </button>

      </form>

    </div>

  );

}