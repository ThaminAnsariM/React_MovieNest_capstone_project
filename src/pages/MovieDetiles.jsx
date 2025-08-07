import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Dateselect from "../component/Dateselect";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loading from "../component/Loading";
import { useClerk,useUser } from "@clerk/clerk-react";


function MovieDetiles() {
  const [movieDetails, setMovieDetails] = useState(null);
  console.log("Movie Details:", movieDetails);
  const { id } = useParams();
  const { openSignIn } = useClerk();
  
  const {
    shows,
    axios,
    getToken,
    user,
    image_base_url,
    fetchFavoriteMovies,
    favoriteMovies,
  } = useAppContext();

  const getMovieDetails = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setMovieDetails(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hansleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoaded, isSignedIn } = useUser();

useEffect(() => {
  if (isLoaded && !isSignedIn) {
    openSignIn();
  }
}, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (user) {
      getMovieDetails();
    }
  }, [id, user]);

  // ✅ Show loading until data is ready
  if (!movieDetails) {
    return (
     <Loading/>
    );
  }

  return (
    <div
      className="w-full min-h-screen px-4 py-5 relative bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${
          image_base_url + movieDetails.movie.backdrop_path
        })`,
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
        {/* Poster */}
        <div className="w-full md:w-[400px] bg-gray-100">
          <img
            src={image_base_url + movieDetails.movie.poster_path}
            alt={movieDetails.movie.title || "Poster"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-6 flex flex-col justify-between gap-6">
          {/* Title and Metadata */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {movieDetails.movie.title}
            </h1>
            <p className="text-lg text-gray-700 mb-1">
              Genre:{" "}
              <span className="font-medium text-gray-900">
                {movieDetails.movie.genres.map((g) => g.name).join(" | ")}
              </span>
            </p>
            <p className="text-gray-600 mb-1">
              Release Date: {movieDetails.movie.release_date}
            </p>
            <p className="flex items-center gap-2 text-yellow-600 font-semibold text-lg">
              <FaStar className="text-yellow-500 size-5" />
              {movieDetails.movie.vote_average.toFixed(1)}
            </p>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {movieDetails.movie.overview || "No description available."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#date-select"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-md transition"
            >
              Book Now
            </a>
            <button
              onClick={hansleFavorite}
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-red-100 transition duration-300 ease-in-out hover:scale-105"
              title="Add to Favorites"
            >
              {favoriteMovies.find((movie) => movie._id === id) ? (
                <FaHeart className="size-6 text-red-600 transition-colors duration-300" />
              ) : (
                <FaRegHeart className="size-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
              )}
            </button>

            <Link to={`/Trailer/${movieDetails.movie._id}`}>
              <button className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded-full transition flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
                Watch Trailer
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cast Section */}

      {console.log('show data',shows)}
     {movieDetails?.movie?.casts?.length > 0 && (
  <div className="w-full max-w-6xl mt-10 z-10">
    <h2 className="text-2xl font-bold text-white mb-4 px-2">
      Favorite Cast
    </h2>
    <div className="flex overflow-x-auto space-x-4 px-2 pb-2">
      {movieDetails.movie.casts.slice(0, 10).map((member, index) => (
        <div
          key={index}
          className="min-w-[140px] bg-transprent  rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
        >
          <img
            src={
              member.profile_path
                ? image_base_url + member.profile_path
                : "/default-avatar.png"
            }
            alt={member.name || "Unknown Actor"}
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />
          <p className="mt-3 text-center text-sm font-medium text-orange-400">
            {member.name || "Unnamed"}
          </p>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Date Select */}
      <div className="mt-10 z-10 w-full max-w-6xl px-2" id="date-select">
        <Dateselect
          datetime={movieDetails.dateTime}
          id={movieDetails.movie._id}
        />
      </div>
    </div>
  );
}

export default MovieDetiles;
