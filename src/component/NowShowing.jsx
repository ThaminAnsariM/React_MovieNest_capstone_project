import React from "react";
import { useNavigate } from "react-router";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

function NowShowing() {

  const navigate = useNavigate();
  const { shows } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <div>
        <h2 className="text-2xl font-bold text-center my-4">Now Showing</h2>
        <p className="text-center text-gray-600">
          Check out the latest movies in theaters!
        </p>
        <div className="flex flex-wrap justify-center p-2 gap-4 mt-4">
          {shows.slice(0,4).map((show, index) => (
            <MovieCard key={index} show={show} />
          ))}
        </div>
      </div>

      <button
        onClick={() => { navigate("/movies"); window.scrollTo(0, 0); }}
        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 my-10 py-2 rounded-md transition duration-200"
      >
        Show More
      </button>
    </div>
  );
}

export default NowShowing;
