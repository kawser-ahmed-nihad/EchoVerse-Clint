import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CiImageOn } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet';


const AddPost = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { loading, user } = useAuth();
    const [fileUrl, setFileUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState("write");
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const { register, handleSubmit, watch, reset } = useForm();


    const { data: allTags = [] } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/tags');
            return res.data;
        },
    });

    //  Filter suggestions when typing tag
    useEffect(() => {
        if (inputValue.trim() === "") {
            setSuggestions([]);
        } else {
            const filtered = allTags.filter((tag) =>
                tag.tagName.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
        }
    }, [inputValue, allTags]);


    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/${user.email}`);
            return res.data;
        },
    });

    const { data: userPosts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['userPosts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/posts/user/${user.email}`);
            return res.data;
        },
    });


    // console.log(userInfo);
    // console.log(userPosts);

    // Handle tag select
    const handleTagSelect = (tag) => {
        if (tags.length >= 3) return;
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setInputValue("");
        setSuggestions([]);
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    //  Upload image to Cloudinary
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadRes = await res.json();

            if (uploadRes.secure_url) {
                setFileUrl(uploadRes.secure_url);
                Swal.fire("Success", "Cover photo uploaded successfully!", "success");
            } else {
                Swal.fire("Error", "Image upload failed!", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong while uploading image", "error");
        } finally {
            setUploading(false);
        }
    };


    //  Submit Post to Backend
    const onSubmit = async (data) => {
        if (!fileUrl) return Swal.fire('Please upload a cover photo!');
        if (tags.length === 0) return Swal.fire("Please select at least one tag!");

        const userRole = userInfo.status;
        // const totalPosts = userPosts. || 0;

        // console.log(userRole);

        if (userRole === "bronze" && userPosts.length >= 5) {
            return Swal.fire({
                icon: "warning",
                title: "Upgrade Required!",
                text: "You’ve reached your 5 post limit. Upgrade to Premium to post more!",
                confirmButtonText: "Upgrade Now",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    //Redirect to membership page
                    navigate("/membership");
                }
            });
        }


        const postData = {
            authorImg: user.photoURL,
            authorName: user.displayName,
            authorEmail: user.email,
            title: data.title,
            content: data.content,
            imageUrl: fileUrl,
            tags,
            upVote: 0,
            downVote: 0,
        };

        try {
            const res = await axiosSecure.post('/api/posts', postData);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Post added successfully', 'success');
                reset();
            }
            reset();
            setFileUrl("");
            setTags([]);
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <>

            <Helmet>
                <title>EchoVerse || Create a New Post</title>
            </Helmet>

            <div className=" px-5 min-h-screen py-8">
                <div className="bg-white max-w-4xl mx-auto rounded-md p-8 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Title */}
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Title..."
                            className="bg-[#f7f7f7] rounded-md text-gray-600 mb-3 focus:outline-0 px-4 py-3 font-medium text-xl w-full"
                        />

                        {/* Cover Photo */}
                        <label
                            htmlFor="coverPhoto"
                            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition"
                        >
                            <CiImageOn size={18} />
                            {uploading ? "Uploading..." : "Set Cover"}
                            <input
                                id="coverPhoto"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>

                        {fileUrl && (
                            <img
                                src={fileUrl}
                                alt="preview"
                                className="mt-3 rounded-md w-full max-h-64 object-cover"
                            />
                        )}

                        {/* Tabs */}
                        <div className="mt-6 border border-[#f7f7f7] rounded-md">
                            <div className="flex items-center py-4 bg-[#f7f7f7] text-sm font-medium text-gray-600">
                                {["write", "preview", "rules"].map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 border-b-2 transition ${activeTab === tab
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent hover:text-blue-500"
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Textarea / Preview */}
                            <div className="p-4">
                                {activeTab === "write" && (
                                    <textarea
                                        {...register("content")}
                                        className="w-full h-64 border-none focus:ring-0 resize-none outline-none text-gray-800 text-sm"
                                        placeholder="Tell your story..."
                                    />
                                )}
                                {activeTab === "preview" && (
                                    <div className="h-64 overflow-y-auto text-gray-700 whitespace-pre-line">
                                        {watch("content") || (
                                            <p className="text-gray-400">Nothing to preview...</p>
                                        )}
                                    </div>
                                )}
                                {activeTab === "rules" && (
                                    <div className="h-64 text-gray-600 text-sm overflow-y-auto">
                                        <p>
                                            Please follow the community guidelines. Be respectful, stay
                                            on topic, and keep your posts constructive.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-6">
                            <label className="text-gray-700 font-medium">
                                Add up to 3 tags (from existing ones)
                            </label>
                            <div className="bg-[#f2f7f7] border border-[#f7f7f7] focus:outline-0 rounded-md px-3 py-2 flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                                    >
                                        #{tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="text-orange-500 hover:text-orange-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}

                                {tags.length < 3 && (
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type tag... (react,node,mongodb,express)"
                                        className="bg-transparent outline-none text-sm text-gray-700 flex-1 min-w-[120px]"
                                    />
                                )}
                            </div>

                            {/* Tag Suggestions */}
                            {suggestions.length > 0 && (
                                <ul className="bg-white border rounded-md mt-1 shadow-sm max-w-sm">
                                    {suggestions.map((tag, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleTagSelect(tag.tagName)}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
                                        >
                                            #{tag.tagName}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || uploading || postsLoading}
                            className={`mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md font-semibold transition ${loading || uploading || postsLoading
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-orange-600"
                                }`}
                        >
                            {uploading ? "Uploading..." : loading ? "Publishing..." : postsLoading ? "Loading..." : "Publish"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddPost;


