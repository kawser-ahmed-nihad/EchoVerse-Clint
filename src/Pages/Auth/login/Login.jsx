import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";


const Login = () => {
    const axiosInstance = useAxios();
    const { loginUser, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoginError(""); // Clear old errors

        loginUser(data.email, data.password)
            .then((res) => {
                const user = res.user;
                if (user.emailVerified) {
                    Swal.fire("Welcome Back!", "Login successful 🎉", "success");
                    reset();
                    navigate(location.state?.from || "/");

                    const userInfo = {
                        name: res.user.displayName || "No Name",
                        email: res.user.email,
                        photo: res.user.photoURL || '',
                        role: "user",
                        status: "bronze"
                    };

                    // Send to backend
                    axiosInstance.post("/api/users", userInfo)
                    Swal.fire("Login Successful", `Welcome back, ${user.displayName || 'User'}!`, "success");
                    navigate(location.state?.from || "/");
                } else {
                    Swal.fire(
                        "Email Not Verified",
                        "Please verify your email before login.",
                        "warning"
                    );
                }
            })
            .catch((err) => {
                // 🔹 Custom error messages
                if (err.code === "auth/invalid-credential") {
                    setLoginError("Invalid credential");
                } else if (err.code === "auth/wrong-password") {
                    setLoginError("Password is incorrect.");
                } else if (err.code === "auth/invalid-email") {
                    setLoginError("Invalid email address.");
                } else {
                    setLoginError("Login failed. Please try again.");
                }
            });
    };

    return (
        <div className="">
            <div className="py-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Welcome Back
                </h2>

                {/* 🔸 Error message display */}
                {loginError && (
                    <p className="text-center text-red-500 font-medium mb-3">
                        {loginError}
                    </p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="bg-[#f2f7f7] border border-gray-300 rounded-md px-4 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-orange-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        disabled={loading}
                        type="submit"
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
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>


                </form>

                {/* Register Link */}
                <p className="text-sm text-gray-600 text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/auth/resgister" className="text-orange-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
