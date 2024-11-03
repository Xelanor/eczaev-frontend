import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Form doğrulama şeması
const schema = yup.object().shape({
  user: yup.object().shape({
    email: yup
      .string()
      .email("Geçerli bir e-posta girin")
      .required("E-posta zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
    user_type: yup.string().default("pharmacy"), // Varsayılan değer olarak 'technician' belirleyin
  }),
  pharmacy_name: yup.string().required("Eczane ismi zorunludur"),
  responsible_person: yup.string().required("Sorumlu kişi adı zorunludur"),
  address: yup.string().required("Adres zorunludur"),
  gln_number: yup.string().required("GLN numarası zorunludur"),
  daily_job: yup.boolean(),
  permanent_job: yup.boolean(),
});

const PharmacyRegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user: {
        user_type: "pharmacy", // Sabit değer olarak "pharmacy" kullanılıyor
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register/pharmacy/`,
        data
      );
      alert("Eczane başarıyla kaydedildi.");
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
        if (apiErrors.pharmacy_name) {
          setError("pharmacy_name", {
            type: "manual",
            message: apiErrors.pharmacy_name[0],
          });
        }
        if (apiErrors.responsible_person) {
          setError("responsible_person", {
            type: "manual",
            message: apiErrors.responsible_person[0],
          });
        }
        if (apiErrors.address) {
          setError("address", {
            type: "manual",
            message: apiErrors.address[0],
          });
        }
        if (apiErrors.gln_number) {
          setError("gln_number", {
            type: "manual",
            message: apiErrors.gln_number[0],
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
          Eczane Kayıt
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
              Eczane İsmi
            </label>
            <input
              type="text"
              {...register("pharmacy_name")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.pharmacy_name?.message}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sorumlu Kişi Ad Soyad
            </label>
            <input
              type="text"
              {...register("responsible_person")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">
              {errors.responsible_person?.message}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adres
            </label>
            <textarea
              {...register("address")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GLN Numarası
            </label>
            <input
              type="text"
              {...register("gln_number")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
            <p className="text-red-500 text-sm">{errors.gln_number?.message}</p>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("daily_job")}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Günlük çalışacak teknisyen arıyorum
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("permanent_job")}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Kalıcı çalışacak teknisyen arıyorum
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

export default PharmacyRegisterPage;
