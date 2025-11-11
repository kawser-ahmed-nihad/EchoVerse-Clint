import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiFillLike, AiOutlineDislike, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const PostDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [voteStatus, setVoteStatus] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    //  Fetch post data
    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/posts/${id}`);
            return res.data;
        },
    });

    // const postLoading = true

    //  Fetch comments data
    const { data: comments = [], isLoading: commentsLoading } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/comments?postId=${id}`);
            return res.data;
        },
    });


    console.log(post);

    //  Vote mutation
    const voteMutation = useMutation({
        mutationFn: async ({ voteType, userId }) =>
            axiosSecure.patch(`/api/posts/${id}/vote`, { voteType, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
        },
    });

    useEffect(() => {
        if (post && user) {
            const userVote = post?.votes?.find(v => v.userId === user?.email);
            setVoteStatus(userVote ? userVote.voteType : null);
        }
    }, [post, user]);



    //  Comment mutation
    const commentMutation = useMutation({
        mutationFn: async (commentData) =>
            axiosSecure.post("/api/comments", commentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            reset();
        },
    });

    //  Define onSubmit function (missing in your code)
    const onSubmit = (data) => {
        if (!user) {
            alert("Please login to comment");
            navigate("/login");
            return;
        }

        const commentData = {
            postId: id,
            userEmail: user.email,
            authorImg: user.photoURL,
            userName: user.displayName || "Anonymous",
            comment: data.comment,
        };

        commentMutation.mutate(commentData);
    };

    if (postLoading || commentsLoading) {
        return <div className="text-center max-w-3xl mx-auto ">

            <div role="status" className="flex items-center justify-center h-96  bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            <div role="status" className=" py-12 animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                <span className="sr-only">Loading...</span>
            </div>



        </div>
    }

    return (
        <>

            <Helmet>
                <title>EchoVerse | {post.title}</title>
            </Helmet>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8">
                <img
                    src={post?.imageUrl}
                    alt={post?.title}
                    className="w-full h-[500px] object-cover rounded-xl mb-6"
                />
                <h1 className="text-2xl font-bold break-all whitespace-pre-wrap text-gray-500 mb-2">{post?.title}</h1>

                <div className="flex flex-wrap gap-2 mb-4">
                    {post?.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="text-sm text-[#e4cea7]"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{post?.content}</p>

                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() =>
                                voteMutation.mutate({ voteType: "upVote", userId: user?.email })
                            }
                            className={`flex items-center gap-1 transition ${voteStatus === "upVote"
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            {voteStatus === "upVote" ? (
                                <AiFillLike size={22} />
                            ) : (
                                <AiOutlineLike size={22} />
                            )}
                            <span>{post?.upVote || 0} Likes</span>
                        </button>

                        <button
                            onClick={() =>
                                voteMutation.mutate({ voteType: "downVote", userId: user?.email })
                            }
                            className={`flex items-center gap-1 transition ${voteStatus === "downVote"
                                ? "text-red-600 font-semibold"
                                : "text-gray-500 hover:text-red-500"
                                }`}
                        >
                            <AiOutlineDislike size={22} />
                            <span>{post?.downVote || 0} Dislikes</span>
                        </button>



                        <button
                            onClick={() => {
                                navigator.share({
                                    title: post.title,
                                    text: "Check out this post!",
                                    url: window.location.href,
                                });
                            }}
                            className="text-green-600 flex items-center gap-1 hover:text-green-800"
                        >
                            <AiOutlineShareAlt size={22} /> Share
                        </button>
                    </div>
                </div>

                {/*  Comment section */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="flex items-center gap-3 ">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src={post.authorImg}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <input
                            type="text"
                            {...register("comment", { required: true })}
                            placeholder="Write a comment..."
                            className="w-full border border-[#e5e6ec] p-3 rounded-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={commentMutation.isPending}
                        className={`mt-2 flex items-center gap-2 justify-center px-4 py-2 rounded-lg text-white transition-colors duration-200 ${commentMutation.isPending
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#ff7c4e] hover:bg-[#ff6a33]"
                            }`}
                    >
                        {commentMutation.isPending && (
                            <svg
                                className="animate-spin h-4 w-4 text-white"
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
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        )}
                        {commentMutation.isPending ? "Adding..." : "Add Comment"}
                    </button>


                </form>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2 border-b border-[#e5e6ec] py-2">Comments</h2>
                    {comments?.length === 0 && (
                        <p className="text-gray-500">No comments yet. Be the first!</p>
                    )}
                    {comments?.map((c) => (

                        <div

                            key={c._id}
                            className=" py-2 flex  gap-3"
                        >

                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                    src={post.authorImg}
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className=" border border-[#e5e6ec] p-3 rounded-2xl space-y-3">

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <strong className="font-medium text-gray-800">{c.userName}</strong>
                                    <span>•</span>
                                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                                </div>

                                <p className="text-sm break-all whitespace-pre-wrap text-gray-700">
                                    {c.comment}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostDetails;
