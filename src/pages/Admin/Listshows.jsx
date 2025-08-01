import React, { useEffect, useState } from "react";
import AdminTitle from "../../component/Admin/AdminTitle";
import { useAppContext } from "../../context/AppContext";


function Listshows() {
  const [shows, setShows] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    setShows(data.shows)
    } catch (error) {
      console.error(error);
    }
  };

  const dateFormat = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  useEffect(() => {
    if(user){

       getAllShows();
    }
   
  }, [user]);

  return (
    <>
      <AdminTitle text1="List" text2="Shows" />
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Movie Name</th>
              <th className="py-3 px-6 text-left">Show Time</th>
              <th className="py-3 px-6 text-left">Total Bookings</th>
              <th className="py-3 px-6 text-left">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-300"
              >
                <td className="py-3 px-6">{show.movie.title}</td>
                <td className="py-3 px-6">{dateFormat(show.showDateTime)}</td>
                <td className="py-3 px-6">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="py-3 px-6">
                  ₹{Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Listshows;
