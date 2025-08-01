import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { BsClock, BsCurrencyRupee } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

function MyBookings() {
  const [booking, setBooking] = useState([]);
  const { axios, getToken, user, image_base_url } = useAppContext();

const getMyBookings = async () => {
  try {
    const { data } = await axios.get("/api/user/bookings", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (data.success) {
      setBooking(data.bookings);
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    if(user){
      getMyBookings();
    }
  }, [user]);

  const dateFormat = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-20 min-h-screen bg-gray-50">
      <h1 className="text-orange-500 text-3xl font-bold mb-8 text-center">
        My Bookings
      </h1>

      {booking.length > 0 ? (
        booking.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-6 max-w-4xl mx-auto"
          >
            {/* Movie Poster */}
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt={item.show.movie.title}
              className="w-full md:w-40 h-auto object-cover rounded-md aspect-[1/1]"
            />

            {/* Movie Info */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {item.show.movie.title}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <BsClock /> {Math.floor(item.show.movie.runtime / 60)}h{" "}
                  {item.show.movie.runtime % 60}m
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <FaRegCalendar /> {dateFormat(item.show.showDateTime)}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Seats:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-700 flex items-center gap-1">
                  <BsCurrencyRupee /> {item.amount}
                </div>
                {!item.isPaid && (
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-full transition">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No bookings available.
        </div>
      )}
    </div>
  );
}

export default MyBookings;
