import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaGooglePlay, FaApple } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12 mt-16 shadow-inner animate-fade-in">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-orange-400">MovieNest</h2>
          <p className="text-gray-400 mt-3">Book your favorite movies anytime, anywhere.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-300 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/Home" className="hover:text-white transition">Home</a></li>
            <li><a href="/Movies" className="hover:text-white transition">Movies</a></li>
            <li><a href="/MyBookings" className="hover:text-white transition">My Bookings</a></li>
            <li><a href="/Favourite" className="hover:text-white transition">Favourites</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-orange-300 mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-2">Get the latest movie updates.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg outline-none w-full text-black bg-gray-50"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* App Download + Socials */}
        <div>
          <h3 className="text-xl font-semibold text-orange-300 mb-3">Get the App</h3>
          <div className="flex flex-col gap-3 mb-5">
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              <FaGooglePlay /> Google Play
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              <FaApple /> App Store
            </a>
          </div>

          <div className="flex gap-4 text-xl text-gray-300">
            <a href="#"><FaFacebook className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaYoutube className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-700 mt-10 pt-5">
        © {new Date().getFullYear()} MovieNest. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
