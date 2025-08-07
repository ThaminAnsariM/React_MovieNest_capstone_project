import React, { useState } from 'react';
import MovieCard from '../component/MovieCard';
import { useAppContext } from '../context/AppContext';
import { Search } from 'lucide-react';

function Movies() {
  const { shows } = useAppContext();
  console.log(shows);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle case when shows are not yet loaded
  if (!shows || !Array.isArray(shows)) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading shows...
      </div>
    );
  }

  // Filter only if searchTerm is not empty
  const filteredShows =
    searchTerm.trim() === ''
      ? shows
      : shows.filter((show) =>
          show?.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8 flex items-center gap-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for movies..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          type="button"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredShows.length > 0 ? (
          filteredShows.map((show, index) => (
            <MovieCard key={index} show={show} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg font-medium">
            No movies found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
