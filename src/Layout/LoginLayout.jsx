import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

import { FaComments, FaPenFancy, FaEnvelopeOpenText, FaUsers, FaLightbulb } from "react-icons/fa";
import { Link, Outlet } from 'react-router';
import SocialLogin from '../Pages/Auth/SocialLogin/SocialLogin';

const LoginLayout = () => {

    const cardClass =
        "flex items-center bg-white shadow-md rounded-xl p-4 mb-5 w-full";


    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side */}
            <div className="flex flex-col p-8 md:p-12 bg-gray-50 md:w-1/2">
                <div className="flex items-center mb-8">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 56 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.3333 0C23.7194 0 24.1033 0.00932962 24.4847 0.0280265C24.4924 0.0284028 24.4989 0.0222809 24.4989 0.0145938V0.0145938C24.4989 0.00716838 24.5049 0.0011489 24.5123 0.0011489H45.8418C46.2974 0.00137965 46.6667 0.373466 46.6667 0.83295C46.6666 1.05356 46.5798 1.26515 46.4251 1.42119L40.8322 7.05882H52.7444C53.5415 7.05882 54.27 7.52957 54.5456 8.27757C55.4857 10.829 56 13.5892 56 16.4706C56 29.4655 45.5533 40 32.6667 40C32.2808 40 31.8971 39.9896 31.5158 39.9709C31.5078 39.9705 31.5011 39.9768 31.5011 39.9848V39.9848C31.5011 39.9926 31.4949 39.9989 31.4871 39.9989H10.1582C9.7026 39.9986 9.33333 39.6265 9.33333 39.1671C9.33336 38.9464 9.42022 38.7348 9.57487 38.5788L15.1655 32.9412H3.25562C2.45846 32.9412 1.73002 32.4704 1.4544 31.7224C0.514256 29.171 0 26.4109 0 23.5294C0 10.5345 10.4467 0 23.3333 0ZM31.3177 16.6556C29.3919 14.383 26.5301 12.9412 23.3333 12.9412C17.5343 12.9412 12.8333 17.6817 12.8333 23.5294C12.8333 24.7672 13.0456 25.9547 13.4326 27.0588H20.9989L24.6823 23.3444C26.6081 25.617 29.4699 27.0588 32.6667 27.0588C38.4657 27.0588 43.1667 22.3183 43.1667 16.4706C43.1667 15.2328 42.9544 14.0453 42.5674 12.9412H35.0011L31.3177 16.6556Z"
                            fill="#ff6933"
                        ></path>
                    </svg>
                    <h1 className="text-2xl text-black ml-3 font-bold">EchoVerse</h1>
                </div>

                <div className="flex flex-col justify-center max-w-xl mx-auto items-center space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                        Join a thriving forum for discussions and collaboration.
                    </h2>

                    {/* Cards */}
                    <div className="flex flex-col w-full space-y-4">
                        <div className={cardClass}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 text-orange-500 text-xl">
                                <FaComments />
                            </div>
                            <p className="ml-4 text-gray-700">
                                Join conversations worldwide on topics you care about.
                            </p>
                        </div>

                        <div className={cardClass}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500 text-xl">
                                <FaPenFancy />
                            </div>
                            <p className="ml-4 text-gray-700">
                                Share your ideas, ask questions, and get feedback from the community.
                            </p>
                        </div>

                        <div className={cardClass}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-500 text-xl">
                                <FaEnvelopeOpenText />
                            </div>
                            <p className="ml-4 text-gray-700">
                                Stay updated with the latest discussions, posts, and replies in your inbox.
                            </p>
                        </div>

                        <div className={cardClass}>
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-500 text-xl">
                                <FaUsers />
                            </div>
                            <p className="ml-4 text-gray-700">
                                Connect with like-minded people and grow your network.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 w-full p-6 md:p-12 flex flex-col justify-center">
                <Outlet />

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                    <span className="absolute bg-white px-2 text-gray-500 text-sm">or</span>
                    <hr className="w-full border-gray-300" />
                </div>

                {/* Social Buttons */}
                <SocialLogin />
            </div>
        </div>


    );
};

export default LoginLayout;