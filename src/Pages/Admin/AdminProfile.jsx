import React from 'react';
import { FaUserFriends, FaImages } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';


const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const fetchPosts = async (axiosSecure, authorEmail, limit = 3) => {
    const res = await axiosSecure.get(`/api/logged/posts?authorEmail=${encodeURIComponent(authorEmail)}&limit=${limit}`);
    return res.data.posts;
};
const AdminProfile = () => {

    const { user: authUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const userEmail = authUser?.email;

 

    const {
        data: posts = [],
        isLoading,
        error: postsError,
    } = useQuery({
        queryKey: ['posts', userEmail],
        queryFn: () => fetchPosts(axiosSecure, userEmail),
        enabled: !!userEmail,
    });
    return (
        <div className=' py-5'>
            <div className="">
                {
                    isLoading ? (
                        <>
                            {[...Array(posts?.length || 5)].map((_, i) => (
                                <>
                                    <div
                                        key={i}
                                        role="status"
                                        className="space-y-8  animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex mb-5 md:items-center"
                                    >
                                        <div className="flex items-center justify-center w-full h-44 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                                            <svg
                                                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M18 0H2a2 2 0..." />
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className=' flex items-center'>
                                                    <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                                    </svg>

                                                    <div>
                                                        <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2 me-3"></div>
                                                        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                    </div>
                                                </div>

                                                <div className='flex items-center '>
                                                    <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>


                                </>




                            ))}
                        </>) : (

                        <>
                            {
                                posts.map((post) => (

                                    <Link to={`/posts/${post._id}`}>
                                        <div key={post._id}
                                            className="flex bg-white p-5 mb-5 gap-5 rounded-xl shadow-sm hover:shadow-md transition">

                                            {/* Post Image */}
                                            <div className="w-40 h-40 flex-shrink-0">
                                                <img
                                                    className="w-full h-full rounded-md object-cover"
                                                    src={post.imageUrl}
                                                    alt="Post Thumbnail"
                                                />
                                            </div>

                                            {/* Post Content */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                {/* Title */}
                                                <div>
                                                    <h1 className="text-lg font-semibold overflow-hidden break-all whitespace-pre-wrap text-gray-800 mb-3">
                                                        {post.title.split(" ").slice(0, 16).join(" ")}
                                                        {post.title.split(" ").length > 16 && " ..."}
                                                    </h1>
                                                    <p className="text-gray-700 mb-3 break-all whitespace-normal">
                                                        {truncate(post.content, 120)}
                                                    </p>


                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {post.tags?.map((tag, index) => (
                                                            <p
                                                                key={index}
                                                                className="bg-[#f4f6f8] text-gray-700 py-1 px-3 rounded-md text-sm font-medium"
                                                            >
                                                                #{tag}
                                                            </p>
                                                        ))}
                                                    </div>

                                                </div>

                                                {/* Author & Stats */}
                                                <div className="flex justify-between items-center">
                                                    {/* Author Info */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                                            <img
                                                                src={post.authorImg}
                                                                alt="User Avatar"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h1 className="font-medium text-gray-800">{post.authorName}</h1>
                                                            <span className="text-sm text-gray-500">Bronze</span>
                                                        </div>
                                                    </div>

                                                    {/* Likes & Comments */}
                                                    <div className="flex gap-6 text-sm text-gray-500">
                                                        <p>{post.upVote} Likes</p>
                                                        <p>{post.commentCount} Comments</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default AdminProfile;