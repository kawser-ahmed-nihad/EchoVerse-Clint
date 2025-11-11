import React from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const { socialLogin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();

    const googleLogin = () => {
        socialLogin()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName || "No Name",
                    email: res.user.email,
                    photo: res.user.photoURL || '',
                    role: "user",
                    status: "bronze"
                };

                // Send to backend
                axiosInstance.post("/api/users", userInfo)
                Swal.fire("Success", "Google Login successful!", "success");
                navigate(location.state?.from || "/");
            })
            .catch(err => {
                Swal.fire("Error", err.message, "error");
            });
    };

    return (
        <div>
            <div className="space-y-3">
                <button
                    onClick={googleLogin}
                    disabled={loading}
                    className={`w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-50"
                        }`}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-red-500"
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
                        <>
                            <FaGoogle className="text-red-500" /> Login with Google
                        </>
                    )}
                </button>

                {/* <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                    <FaFacebook className="text-blue-500" /> Login with Facebook
                </button>
                <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                    <FaTwitter className="text-sky-500" /> Login with Twitter
                </button> */}
            </div>
        </div>
    );
};

export default SocialLogin;