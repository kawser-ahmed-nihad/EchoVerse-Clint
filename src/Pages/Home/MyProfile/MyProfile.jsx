import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';

const fetchPosts = async (axiosSecure, authorEmail, limit = 3) => {
    const res = await axiosSecure.get(`/api/logged/posts?authorEmail=${encodeURIComponent(authorEmail)}&limit=${limit}`);
    return res.data.posts;
};

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const MyProfile = () => {
    const { user: authUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = authUser?.email;

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', userEmail],
        queryFn: () => fetchPosts(axiosSecure, userEmail),
        enabled: !!userEmail,
    });

    return (
        <>

            <Helmet>
                <title>EchoVerse || My Profile</title>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-6">My Posts</h2>

                <div className="space-y-5">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-lg">
                                <div className="w-full md:w-40 h-40 bg-gray-300 rounded-md"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))
                    ) : posts.length === 0 ? (
                        <p className="text-center text-gray-500 py-6">You have not posted anything yet.</p>
                    ) : (
                        posts.map((post) => (
                            <Link key={post._id} to={`/posts/${post._id}`}>
                                <div className="flex flex-col md:flex-row bg-white p-5 gap-5 rounded-xl shadow-sm hover:shadow-md transition mb-5">
                                    {/* Post Image */}
                                    <div className="w-full md:w-40 h-40 flex-shrink-0">
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
                                            <h1 className="text-lg font-semibold text-gray-800 mb-2 break-words">
                                                {post.title.split(" ").slice(0, 16).join(" ")}
                                                {post.title.split(" ").length > 16 && " ..."}
                                            </h1>
                                            <p className="text-gray-700 mb-3 break-words">
                                                {truncate(post.content, 120)}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags?.map((tag, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-700 py-1 px-3 rounded-md text-sm font-medium">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Author & Stats */}
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-3 md:gap-0">
                                            {/* Author Info */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img src={post.authorImg} alt="User Avatar" />
                                                </div>
                                                <div>
                                                    <h1 className="font-medium text-gray-800">{post.authorName}</h1>
                                                    <span className="text-sm text-gray-500">Bronze</span>
                                                </div>
                                            </div>

                                            {/* Likes & Comments */}
                                            <div className="flex gap-6 text-sm text-gray-500 mt-2 md:mt-0">
                                                <p>{post.upVote} Likes</p>
                                                <p>{post.commentCount} Comments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default MyProfile;
