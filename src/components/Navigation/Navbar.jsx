import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Eczaev.com</h1>
      <div className="flex space-x-4">
        <Link
          to="/register/pharmacy"
          className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200"
        >
          Eczane Kayıt
        </Link>
        <Link
          to="/register/technician"
          className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200"
        >
          Teknisyen Kayıt
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
