import { useState } from "react";
import Menu from "./Menu";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router";
import { LuTicketPlus } from "react-icons/lu";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = useUser();
  

  const { openSignIn } = useClerk();
  

  

  const toggleMenu = () => {
    if (menuOpen === false) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 py-2 bg-transparent relative">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl sm:text-4xl font-bold text-orange-500">
            MovieNest
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-x-6 border bg-orange-50 border-orange-500 rounded-2xl px-4 py-2 mr-45">
          <Link
            to="/"
            className="font-semibold text-gray-700 hover:text-orange-500"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="font-semibold text-gray-700 hover:text-orange-500"
          >
            Movies
          </Link>
          <Link
            to="/favourites"
            className="font-semibold text-gray-700 hover:text-orange-500"
          >
            Favourites
          </Link>
        </div>

        {/* User Auth & Menu Button */}
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          {!user ? (
            <button
              onClick={openSignIn}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<LuTicketPlus width={16} height={16} />}
                  onClick={() => navigate("/bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center">
            <button type="button" onClick={toggleMenu}>
              {!menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && <Menu />}
    </>
  );
}

export default Nav;
