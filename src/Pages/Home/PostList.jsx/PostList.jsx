import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Helmet } from 'react-helmet';

const fetchPosts = async (axiosSecure, selectedTag, popular, page, searchTerm) => {
    let url = `/api/posts?page=${page}&limit=5`;
    if (selectedTag) url += `&tag=${selectedTag}`;
    if (popular) url += `&sort=popular`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    const res = await axiosSecure.get(url);
    return res.data;
};

const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + '...' : str);

const PostList = ({ searchTerm, selectedTag }) => {
    const axiosSecure = useAxios();
    const [page, setPage] = useState(1);
    const [popular, setPopular] = useState(false);

    useEffect(() => {
        setPage(1);
    }, [selectedTag, searchTerm]);

    const { data = {}, isLoading } = useQuery({
        queryKey: ['posts', selectedTag, popular, page, searchTerm],
        queryFn: () => fetchPosts(axiosSecure, selectedTag, popular, page, searchTerm),
        keepPreviousData: true,
    });

    const posts = data.posts || [];
    const totalPages = data.totalPages || 1;

    return (
        <>
            <Helmet>
                <title>EchoVerse | Explore All Posts</title>
            </Helmet>

            <div className="px-0 md:px-6 lg:px-10">
                {/* Create Post */}
                <div className="grid bg-white p-4 rounded-md grid-cols-[3rem_1fr_auto] items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={posts.authorImg} alt="User Avatar" />
                    </div>
                    <div className="bg-[#f4f6f8] rounded-md py-3 px-1.5 text-gray-500 text-sm">
                        <p className="hidden md:flex">Let's share what's going on your mind...</p>
                        <p className="flex md:hidden">Share what’s new...</p>
                    </div>
                    <div>
                        <Link
                            to="/add-post"
                            className="bg-[#ff6934] hover:bg-[#e85b29] text-white font-medium px-4 py-2 rounded-md transition"
                        >
                            Create Post
                        </Link>
                    </div>
                </div>


                {/* Popular filter */}
                <div className="flex flex-wrap items-center mt-5 justify-end gap-6 md:gap-14">
                    <label className="flex gap-3 items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            className="hidden peer"
                            checked={popular}
                            onChange={() => setPopular(!popular)}
                        />
                        <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600"></span>
                        <svg
                            className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2"
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z"
                                fill="#2563EB"
                                stroke="#2563EB"
                                strokeWidth=".4"
                            />
                        </svg>
                        <span className="text-gray-700 select-none">Show Popular</span>
                    </label>
                </div>

                {/* Posts */}
                <div className="py-5 flex flex-col gap-5">
                    {isLoading
                        ? [...Array(5)].map((_, i) => (
                            <div key={i} role="status" className="animate-pulse flex flex-col md:flex-row gap-4 bg-gray-100 rounded-md p-4">
                                <div className="w-full md:w-40 h-40 bg-gray-300 rounded-md"></div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))
                        : posts.map((post) => (
                            <Link key={post._id} to={`/posts/${post._id}`}>
                                <div className="flex flex-col md:flex-row bg-white p-4 gap-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    {/* Post Image */}
                                    <div className="w-full md:w-40 h-40 flex-shrink-0">
                                        <img
                                            className="w-full h-full object-cover rounded-md"
                                            src={post.imageUrl}
                                            alt={post.title}
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between gap-2">
                                        <div>
                                            <h1 className="text-lg font-semibold text-gray-800 break-words mb-2">
                                                {truncate(post.title, 60)}
                                            </h1>
                                            <p className="text-gray-700 break-words">{truncate(post.content, 120)}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {post.tags?.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-[#f4f6f8] text-gray-700 py-1 px-3 rounded-md text-sm font-medium"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-2">
                                            {/* Author */}
                                            <div className="flex items-center gap-2">
                                                <img src={post.authorImg} alt={post.authorName} className="w-10 h-10 object-cover rounded-full" />
                                                <div>
                                                    <h2 className="text-gray-800 font-medium">{post.authorName}</h2>
                                                    <span className="text-gray-500 text-sm">
                                                        {formatDistanceToNow(new Date(post.createdAt))} ago
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Stats */}
                                            <div className="flex gap-4 text-gray-500 text-sm mt-2 md:mt-0">
                                                <span>{post.upVote} Likes</span>
                                                <span>{post.commentCount} Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 flex-wrap gap-2">
                    {[...Array(totalPages).keys()].map((p) => (
                        <button
                            key={p + 1}
                            onClick={() => setPage(p + 1)}
                            className={`w-9 h-9 md:w-12 md:h-12 border border-gray-200 rounded-md ${page === p + 1 ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-gray-100 text-gray-500'
                                }`}
                        >
                            {p + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostList;
