import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Link } from "react-router";

function Bannerslider() {
  const [topmovies, setTopmovies] = useState([]);
  

  const API_Key = "api_key=dd65ea68edeb37fd583997a135774d80";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?${API_Key}`
        );
        setTopmovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  return (
    <Slider {...settings}>
      {topmovies.slice(0, 5).map((movie) => (
        <div
          key={movie.id}
          className="relative w-full h-[75vh]  overflow-hidden shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 p-6 text-white z-10 max-w-4xl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {movie.title}
            </h1>
            

            <p className="text-sm sm:text-base md:text-lg line-clamp-3 leading-relaxed mb-4">
              {movie.overview}
            </p>
            <Link to={`/Trailer/${movie.id}`}>
              <button className="bg-gray-600 opacity-80 text-white px-4 py-2 rounded hover:bg-red-900 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 inline-block mr-2 align-middle"
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
                <span className="align-middle">Watch Trailer</span>
              </button>
            </Link>
          </motion.div>
          <div className="absolute top-4 sm:top-6 left-2 sm:left-4 z-20">
            <h1
              className="flex items-center gap-1 text-black 
               text-base sm:text-lg md:text-xl lg:text-2xl 
               font-semibold 
               bg-white/60 
               rounded-2xl 
               px-3 sm:px-4 py-1 sm:py-2 
               shadow-md"
            >
              <span className="text-red-600">Upcoming</span>
              <span className="text-gray-800">{movie.release_date}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>
            </h1>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Bannerslider;
