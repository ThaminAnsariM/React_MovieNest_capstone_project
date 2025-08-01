import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  PlusSquareIcon,
  ListIcon,
  ListCollapseIcon,
} from "lucide-react";
import { NavLink } from "react-router";

function AdminSidebar() {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
  ];

  return (
    <aside className="h-screen w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col items-center md:items-start px-2 md:px-4 py-6 transition-all duration-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center md:items-start gap-2 mb-10 w-full">
        <img
          src={user.imageUrl}
          alt="Admin"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-orange-400"
        />
        <p className="hidden md:block text-base font-medium text-gray-800">
          {user.firstName} {user.lastName}
        </p>
      </div>

      {/* Navigation */}
      <nav className="w-full flex flex-col gap-2">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
              ${isActive
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-orange-500"}`
            }
          >
            <link.icon className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
