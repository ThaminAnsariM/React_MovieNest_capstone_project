import { useParams, useNavigate } from "react-router";
import { assets } from "../assets/assets";
import { useState, useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function SeatLayout() {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const { axios, getToken, user } = useAppContext();
  const navigate = useNavigate();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setMovieDetails(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShow();
  }, [id, date]);

  const isoTimeFormat = (time) => {
    const d = new Date(time);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSeatClick = (seatId) => {
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast("This seat is not available");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat != seatId)
        : [...prev, seatId]
    );
  };

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please Login to proceed");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats");

      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`, // ✅ FIXED
          },
        }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  const renderSeats = () => {
    const rows = 5;
    const cols = 8;

    return Array.from({ length: rows * cols }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;

      return (
        <button
          key={seatNumber}
          onClick={() => handleSeatClick(seatNumber)}
          className={`aspect-square text-xs sm:text-sm m-1 rounded-md
  ${
    selectedSeats.includes(seatNumber)
      ? "bg-green-600 text-white"
      : "bg-gray-200 hover:bg-gray-300"
  }
  ${occupiedSeats.includes(seatNumber) ? "bg-gray-600 opacity-50 pointer-events-none" : ""}
`}
        >
          {seatNumber}
        </button>
      );
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      {movieDetails && movieDetails.dateTime && movieDetails.dateTime[date] ? (
        <>
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Choose Show Time
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {movieDetails.dateTime[date].map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition
                  text-sm font-medium 
                  ${
                    selectedTime === item.time
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 hover:bg-orange-200 text-orange-500"
                  }`}
                onClick={() => {
                  setSelectedTime(item);
                  setSelectedSeats([]); // Reset seats on time change
                }}
              >
                <AiOutlineClockCircle className="size-5" />
                {isoTimeFormat(item.time)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600">Loading show timings...</p>
      )}

      {selectedTime && (
        <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-center font-semibold text-lg mb-4 text-gray-700">
            Select Your Seats
          </h2>

          {/* Screen */}
          <div className="flex justify-center mb-3">
            <img
              src={assets.screenImage}
              alt="Screen"
              className="w-[70%] sm:w-1/2 max-w-md"
            />
          </div>

          {/* Seat Layout */}
          <div className="w-full flex justify-center overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 p-2 max-w-[95vw] sm:max-w-md">
              {renderSeats()}
            </div>
          </div>

          {/* Selected Seats Info */}
          <div className="mt-6 text-center">
            {selectedSeats.length > 0 ? (
              <>
                <p className="text-gray-700 font-medium">
                  Selected Seats:{" "}
                  <span className="text-green-600">
                    {selectedSeats.join(", ")}
                  </span>
                </p>
                <button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={bookTickets}
                >
                  Proceed
                </button>
              </>
            ) : (
              <p className="text-gray-500">No seats selected yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeatLayout;
