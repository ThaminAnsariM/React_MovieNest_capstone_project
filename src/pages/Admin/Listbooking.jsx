import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import AdminTitle from "../../component/Admin/AdminTitle";
import { useAppContext } from "../../context/AppContext";

function Listbooking() {
  const [booking, setBooking] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      setBooking(Array.isArray(data.bookings) ? data.bookings : []);

      console.log(data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  return (
    <>
      <AdminTitle text1="List" text2="Bookings" />
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">User Name</th>
              <th className="py-3 px-6 text-left">Movie Name</th>
              <th className="py-3 px-6 text-left">Show Time</th>
              <th className="py-3 px-6 text-left">Seats</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {booking.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              booking.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{item.user?.name ?? "N/A"}</td>
                  <td className="py-3 px-6">
                    {item.show?.movie?.title ?? "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    {item.show ? formatDateTime(item.show.showDateTime) : "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    {item.bookedSeats
                      ? Object.values(item.bookedSeats).join(", ")
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">₹{item.amount ?? 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Listbooking;
