import { useEffect, useState, useRef } from "react";
import { dummyShowsData } from "../../assets/assets";
import AdminTitle from "../../component/Admin/AdminTitle";
import {
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaCheckSquare,
} from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Addshow() {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const scrollRef = useRef(null);
  const [addingShow, setAddingShow] = useState(false);

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setNowPlayingMovies(data.movies);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setAddingShow(true);

      if (
        !selectedMovies ||
        Object.keys(dateTimeSelection).length === 0 ||
        !showPrice
      ) {
        return toast.error("Missing required fields");
      }

      const showInput = Object.entries(dateTimeSelection).map(
        ([date, time]) => ({ date, time })
      );

      const payload = {
        movieId: selectedMovies,
        showInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/api/show/add", payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        setSelectedMovies(null);
        setDateTimeSelection({});
        setShowPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    }

    setAddingShow(false);
  };

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }
  }, [user]);

  const Kconverter = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== time);
      if (updatedTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updatedTimes };
    });
  };

  return (
    <>
      <AdminTitle text1="Add" text2="Shows" />

      {/* Movie Selector */}
      <section className="relative p-4">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Now Playing Movies
        </p>

        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>

        {/* Horizontal Scroll List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-2 py-2 scrollbar-thin scrollbar-thumb-gray-400 scroll-smooth"
        >
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovies(movie.id)}
              className={`min-w-[150px] sm:min-w-[180px] md:min-w-[200px] bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 cursor-pointer flex-shrink-0 border-2 ${
                selectedMovies === movie.id
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <div className="relative h-40 sm:h-48 md:h-56 rounded-t-xl overflow-hidden">
                <img
                  src={image_base_url + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {selectedMovies === movie.id && (
                  <div className="absolute top-2 right-2 bg-white text-green-600 p-1 rounded-full shadow">
                    <FaCheckSquare className="text-lg" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold truncate text-gray-800">
                  {movie.title}
                </h3>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <FaRegStar className="text-yellow-500" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span>{Kconverter(movie.vote_count)} votes</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Released: {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Show Price */}
      <section className="mt-6 px-4">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
          <BsCurrencyRupee /> Show Price
        </label>
        <input
          type="number"
          min={0}
          value={showPrice}
          onChange={(e) => setShowPrice(e.target.value)}
          placeholder="Enter show price"
          className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-400"
        />
      </section>

      {/* DateTime Picker */}
      <section className="mt-6 px-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Select Date and Time
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="border rounded-md p-2 outline-none w-full sm:w-auto"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Add Time
          </button>
        </div>
      </section>

      {/* Selected Time List */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <section className="mt-6 px-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Show Timings</p>
          {Object.entries(dateTimeSelection).map(([date, times]) => (
            <div key={date} className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800">{date}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {times.map((time) => (
                  <span
                    key={time}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center gap-2"
                  >
                    {time}
                    <button
                      onClick={() => handleRemoveTime(date, time)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Add Show Button */}
      <section className="mt-6 px-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 rounded-md transition shadow ${
            !selectedMovies || !showPrice
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
          disabled={addingShow}
        >
          Add Show
        </button>
      </section>
    </>
  );
}

export default Addshow;
