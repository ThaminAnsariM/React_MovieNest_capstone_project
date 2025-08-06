import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { useAppContext } from "../context/AppContext";

function MovieCard({ show }) {

  const {image_base_url} = useAppContext()

  
 

  return (
    
    <div className="bg-white rounded-xl shadow-md w-full max-w-xs mx-auto p-4 transition-transform duration-300 hover:scale-[1.02]">
      {/* Poster */}
      <Link to={`/movies/${show._id}`} className="no-underline">
      <img
        src={image_base_url+show.backdrop_path}
        alt="Movie Poster"
        className="w-full h-56 sm:h-60 object-cover rounded-lg mb-3"
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{show.title}</h3>

      {/* Description */}
      <p className="text-sm font-medium text-gray-500 mt-1">
        {new Date (show.release_date).getFullYear()} · {show.genres.slice(0,2).map(genre => genre.name).join(" | ")} · {Math.floor(show.runtime / 60)}h {show.runtime % 60}m
      </p>
      
      {/* Rating & Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-yellow-500 gap-1 text-sm">
          <FaStar />
          <span className="text-gray-700">{show.vote_average.toFixed(1)}</span>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-1.5 rounded-md transition duration-200">
          Book Now
        </button>
      </div>
       </Link>
    </div>
   
  );
}

export default MovieCard;
