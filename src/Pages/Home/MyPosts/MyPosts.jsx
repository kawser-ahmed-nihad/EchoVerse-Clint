import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import {
    FaRegFileAlt,
    FaThumbsUp,
    FaThumbsDown,
    FaCommentDots,
    FaTrashAlt,
} from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        data: posts = [],
        isLoading,
    } = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/logged/posts'); // no email in query!
            return res.data.posts;
        },
        enabled: !!user?.email,
    });
    console.log(user);
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/api/posts/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Post has been deleted.', 'success');
            queryClient.invalidateQueries(['myPosts', user?.email]);
        },
        onError: () => {
            Swal.fire('Error!', 'Could not delete the post.', 'error');
        },
    });


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };
    // const isLoading = true
    if (isLoading) return <p className="text-center text-gray-600 py-8 h-screen">Loading posts...</p>;
    // console.log(posts);
    return (
        <>
            <Helmet>
                <title>EchoVerse || My Posts</title>
            </Helmet>
            <div className="max-w-7xl mx-auto md:px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold"></h2>
                </div>

                <div className="overflow-x-auto rounded-lg">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-500 py-6 h-screen">
                            You have not posted anything yet.
                        </p>
                    ) : (

                        <>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 font-medium">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Title</th>
                                            <th scope="col" className="px-6 py-3">Votes</th>
                                            <th scope="col" className="px-6 py-3 ">Comments</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {posts.map((post, index) => (
                                            <tr
                                                key={index}
                                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    title={post.title}
                                                >
                                                    {post.title.split(" ").slice(0, 3).join(" ")}
                                                    {post.title.split(" ").length > 3 && " ..."}
                                                </th>

                                                <td className="px-6 py-4"><div className="flex justify-center gap-3">
                                                    <span className="flex items-center text-green-600 gap-1">
                                                        <FaThumbsUp /> {post.upVote}
                                                    </span>
                                                    <span className="flex items-center text-red-500 gap-1">
                                                        <FaThumbsDown /> {post.downVote}
                                                    </span>
                                                </div>
                                                </td>
                                                <td className="px-6 py-4"> <Link
                                                    to={`/dashboard/comments/${post._id}`}
                                                    className="btn btn-sm btn-info text-white gap-1"
                                                >
                                                    <FaCommentDots />
                                                    {post.commentCount || 0}
                                                </Link>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        className="btn btn-sm btn-error text-white gap-1"
                                                    >
                                                        <FaTrashAlt />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyPosts;
