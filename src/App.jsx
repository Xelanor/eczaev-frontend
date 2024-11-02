import React from "react";
import Navbar from "./components/Navigation/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TechnicianRegisterPage from "./pages/TechnicianRegisterPage";
import PharmacyRegisterPage from "./pages/PharmacyRegisterPage";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register/technician"
              element={
                <ProtectedRoute>
                  <TechnicianRegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register/pharmacy"
              element={
                <ProtectedRoute>
                  <PharmacyRegisterPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
