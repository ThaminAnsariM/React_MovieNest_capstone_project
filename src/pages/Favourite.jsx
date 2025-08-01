import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loading from "../component/Loading";


function Favorites() {
  const { favoriteMovies,image_base_url } = useAppContext();
  const [loading, setLoading] = useState(true);

  console.log(favoriteMovies);

  useEffect(() => {
    // Simulate loading (e.g., delay to mimic API or localStorage fetch)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      
      {loading ? (
        <Loading/>
      ) : favoriteMovies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No favorites found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteMovies.map((fav, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4">
              <img
                src={image_base_url+fav.poster_path || "/placeholder.jpg"}
                alt={fav.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{fav.title}</h3>
              <p className="text-sm text-gray-600">
                {fav.overview || "No description."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
