import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import logo from "../../assets/eczaev_logo_small.jpg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-red-500 text-white p-4 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-12 w-auto mr-4" />{" "}
      </Link>
      <div className="flex space-x-4">
        {user ? (
          <>
            <p>Merhaba, {user.email}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200"
            >
              Giriş Yap
            </Link>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200" // Kayıt Ol butonu
              >
                Kayıt Ol
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg">
                  <Link
                    to="/register/pharmacy"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Eczane Kayıt
                  </Link>
                  <Link
                    to="/register/technician"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Teknisyen Kayıt
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
