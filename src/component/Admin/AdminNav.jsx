import React from 'react';
import { Link } from 'react-router';

function AdminNav() {
  return (
    <header className="w-full px-6 py-4 shadow-sm bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-orange-500 text-white font-bold text-xl rounded-full flex items-center justify-center">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-orange-500 tracking-tight">
              MovieNest
            </h1>
            <p className="text-xs text-gray-400 leading-none">Admin Panel</p>
          </div>
        </Link>

        {/* Placeholder for actions (optional) */}
        {/* <div className="hidden md:flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-orange-500">Logout</button>
        </div> */}
      </div>
    </header>
  );
}

export default AdminNav;
