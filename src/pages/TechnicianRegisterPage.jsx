import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Form doğrulama şeması
const technicianSchema = yup.object().shape({
  user: yup.object().shape({
    email: yup
      .string()
      .email("Geçerli bir e-posta girin")
      .required("E-posta zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
    user_type: yup.string().default("technician"), // Varsayılan değer olarak 'technician' belirleyin
  }),
  name: yup.string().required("Ad ve Soyad zorunludur"),
  district: yup.string().required("İlçe zorunludur"),
  birth_date: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Doğum tarihi YYYY-MM-DD formatında olmalıdır"
    )
    .nullable(), // Doğum tarihi boş geçilebilir
  phone_number: yup.string().required("Telefon numarası zorunludur"),
  national_id: yup.string().required("TC Kimlik No zorunludur"),
  daily_job: yup.boolean(),
  permanent_job: yup.boolean(),
});

const TechnicianRegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(technicianSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register/technician/`,
        data
      );
      alert("Teknisyen başarıyla kaydedildi.");
    } catch (error) {
      if (error.response && error.response.data) {
        const apiErrors = error.response.data;

        // API'den dönen hatalara göre setError kullanımı
        if (apiErrors.user?.email) {
          setError("user.email", {
            type: "manual",
            message: apiErrors.user.email[0],
          });
        }
        if (apiErrors.user?.password) {
          setError("user.password", {
            type: "manual",
            message: apiErrors.user.password[0],
          });
        }
        if (apiErrors.name) {
          setError("name", { type: "manual", message: apiErrors.name[0] });
        }
        if (apiErrors.district) {
          setError("district", {
            type: "manual",
            message: apiErrors.district[0],
          });
        }
        if (apiErrors.birth_date) {
          setError("birth_date", {
            type: "manual",
            message: apiErrors.birth_date[0],
          });
        }
        if (apiErrors.phone_number) {
          setError("phone_number", {
            type: "manual",
            message: apiErrors.phone_number[0],
          });
        }
        if (apiErrors.national_id) {
          setError("national_id", {
            type: "manual",
            message: apiErrors.national_id[0],
          });
        }
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Teknisyen Kayıt
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Kullanıcı Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              {...register("user.email")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.user?.email?.message}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              {...register("user.password")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.user?.password?.message}
            </p>
          </div>

          {/* Profil Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad ve Soyad
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              İlçe
            </label>
            <input
              type="text"
              {...register("district")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">{errors.district?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              {...register("birth_date")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefon Numarası
            </label>
            <input
              type="tel"
              {...register("phone_number")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.phone_number?.message}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TC Kimlik No
            </label>
            <input
              type="text"
              {...register("national_id")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.national_id?.message}
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("daily_job")}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Günlük iş istiyorum
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("permanent_job")}
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
