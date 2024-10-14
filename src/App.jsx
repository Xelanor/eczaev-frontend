import React from "react";
import Navbar from "./components/Navigation/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TechnicianRegisterPage from "./pages/TechnicianRegisterPage";
import PharmacyRegisterPage from "./pages/PharmacyRegisterPage";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/register/technician"
              element={<TechnicianRegisterPage />}
            />
            <Route
              path="/register/pharmacy"
              element={<PharmacyRegisterPage />}
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
