import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UserIcon,
} from "lucide-react";
import { dummyDashboardData } from "../../assets/assets";
import { useEffect, useState } from "react";
import AdminTitle from "../../component/Admin/AdminTitle";
import { FaRupeeSign, FaRegStar } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

function Dashboard() {
  const { axios, getToken, user, image_base_url } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `₹${dashboardData.totalRevenue || "0"}`,
      icon: CircleDollarSignIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UserIcon,
      color: "bg-purple-100 text-purple-600",
    },
  ];

const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get("/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (data.success) {
      console.log("dashboard data ", data.dashboardData);
      setDashboardData(data.dahsboardData);
      console.log(data.dahsboardData)  
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Error fetching dashboard data");
    console.error(error);
  }
};


  const dateFormat = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <>
      <AdminTitle text1="Admin" text2="Dashboard" />

      {/* Dashboard Summary Cards */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition duration-300"
              >
                {/* Icon */}
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-xl font-semibold">{card.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Shows Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Active Shows
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
            >
              <img
                src={image_base_url+show.movie.poster_path}
                alt={show.movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {show.movie.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p className="flex items-center gap-1">
                    <FaRupeeSign className="text-green-500" />
                    {show.showPrice}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRegStar className="text-yellow-500" />
                    {show.movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {dateFormat(show.showDateTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
