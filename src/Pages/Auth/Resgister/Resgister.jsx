import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser , loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let photoURL = "";

      // 📤 Upload to Cloudinary
      if (data.photo[0]) {
        const formData = new FormData();
        formData.append("file", data.photo[0]);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadRes = await res.json();
        if (uploadRes.secure_url) {
          photoURL = uploadRes.secure_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Firebase Auth Create User
      createUser(data.email, data.password)
        .then((res) => {
          const user = res.user;

          updateUser({
            displayName: data.name,
            photoURL: photoURL,
          })
            .then(() => {
              sendEmailVerification(user)
                .then(() => {
                  Swal.fire(
                    "Registration Successful!",
                    "Please check your email inbox or spam folder to verify your account before login.",
                    "success"
                  ).then(() => {
                    reset();
                    navigate("/auth/login");
                  });
                })
                .catch((error) => {
                  Swal.fire("Email Error", error.message, "error");
                });
            })
            .catch((err) => {
              Swal.fire("Profile Update Failed", err.message, "error");
            });
        })
        .catch((err) => {
          Swal.fire("Signup Failed", err.message, "error");
        });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="py-5">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Create an Account
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Photo */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Profile photo is required" })}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-orange-50 file:text-orange-600
              hover:file:bg-orange-100"
          />
          {errors.photo && (
            <span className="text-red-500 text-sm">{errors.photo.message}</span>
          )}
        </div>

        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Full name is required" })}
            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-orange-500 text-white py-2 rounded-md font-semibold transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-orange-500 hover:underline">
          Sign in
        </Link>
      </p>

    </div>
  );
};

export default Register;
