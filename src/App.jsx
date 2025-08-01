import { Routes, Route, useLocation } from "react-router";
import Nav from "./component/Nav";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetailes from "./pages/MovieDetiles";
import MyBookings from "./pages/MyBookings";
import Favourite from "./pages/Favourite";
import SeatLayout from "./pages/SeatLayout";
import Footer from "./component/Footer";
import Trailer from "./pages/Trailer";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import Addshow from "./pages/Admin/Addshow";
import Listshows from "./pages/Admin/Listshows";
import Listbooking from "./pages/Admin/Listbooking";
import { useAppContext } from "./context/AppContext";
import ProtectedAdminRoute from "./component/Admin/ProtectedAdminRoute";
import Loading from "./component/Loading";

function App() {
  const isAdminRout = useLocation().pathname.startsWith("/admin");

  const { user, isAdmin, adminChecked } = useAppContext();

  return (
    <>
      <Toaster />

      {!isAdminRout && (
        <div className="sticky top-0 z-50">
          <Nav></Nav>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetailes />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/movies/:id/date/:date" element={<SeatLayout />} />
        <Route path="/trailer/:id" element={<Trailer />} />
        <Route path="/admin/*" element={<ProtectedAdminRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<Addshow />} />
          <Route path="list-shows" element={<Listshows />} />
          <Route path="list-bookings" element={<Listbooking />} />
        </Route>
      </Routes>

      {!isAdminRout && <Footer></Footer>}
    </>
  );
}

export default App;
