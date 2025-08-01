import React from "react";
import { Link } from "react-router";

function Menu() {
  return (
    <div>
      <div className="absolute top-15 right-0 w-1/2 bg-white shadow-2xl rounded-2xl p-4">
        <ul className="flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>
          <Link to="/movies" className="text-gray-700 hover:text-orange-500">
            Movies
          </Link>
          <Link
            to="/favourites"
            className="text-gray-700 hover:text-orange-500"
          >
            Favourites
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
