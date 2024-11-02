import React, { useState } from "react";
import axios from "axios";

const TechnicianRegisterPage = () => {
  const [formData, setFormData] = useState({
    user: {
      email: "",
      password: "",
      user_type: "technician", // Otomatik olarak teknisyen
    },
    name: "", // Ad ve soyadı tek bir alanda tutuyoruz
    district: "",
    birth_date: "",
    phone_number: "",
    national_id: "",
    daily_job: false,
    permanent_job: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("user.")) {
      const userField = name.split(".")[1]; // 'user.email' -> 'email'
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [userField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register/technician/`,
        formData
      );
      alert("Teknisyen başarıyla kaydedildi.");
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="py-8 bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Teknisyen Kayıt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kullanıcı Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              name="user.email"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              name="user.password"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Profil Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad ve Soyad
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              İlçe
            </label>
            <input
              type="text"
              name="district"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              name="birth_date"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefon Numarası
            </label>
            <input
              type="tel"
              name="phone_number"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TC Kimlik No
            </label>
            <input
              type="text"
              name="national_id"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="daily_job"
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Günlük iş istiyorum
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="permanent_job"
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Kalıcı iş istiyorum
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default TechnicianRegisterPage;
