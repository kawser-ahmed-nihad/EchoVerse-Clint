import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaReact, FaNodeJs, FaRegFileAlt, FaCommentDots, FaTags, FaExclamationTriangle, FaUsersCog, FaBullhorn } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiNextdotjs, SiPython } from "react-icons/si";
import { NavLink } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { useSearch } from "../../context/SearchContext/SearchContext";

const LeftNav = () => {
    const axiosSecure = useAxios();
    const { selectedTag, setSelectedTag } = useSearch();
    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    const tagIcons = {
        react: <FaReact className="text-blue-500" size={18} />,
        node: <FaNodeJs className="text-green-600" size={18} />,
        mongodb: <SiMongodb className="text-green-500" size={18} />,
        express: <SiExpress className="text-gray-700" size={18} />,
        typescript: <SiTypescript className="text-blue-600" size={18} />,
        nextjs: <SiNextdotjs className="text-black" size={18} />,
        python: <SiPython className="text-yellow-500" size={18} />,
    };

    const fetchTags = async () => {
        const res = await axiosSecure.get("/api/tags");
        return res.data;
    };

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    return (
        <>
            {isAdmin && (
                <div className="bg-white rounded-xl px-4 py-2 shadow-sm mb-5">
                    <h1 className="text-xl font-medium px-4 py-4">Menu</h1>

                    <ul className="font-semibold text-left text-gray-700 rounded-md space-y-2">
                        <li>
                            <NavLink
                                to="/dashboard/add-tags"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 font-semibold text-sm text-gray-700 rounded-md px-4 py-2 transition ${isActive ? "bg-[#f3f4f6]" : "hover:bg-[#f3f4f6]"
                                    }`
                                }
                            >
                                <FaTags className="text-purple-600" /> Add Tags
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/reported-activities"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 font-semibold text-sm text-gray-700 rounded-md px-4 py-2 transition ${isActive ? "bg-[#f3f4f6]" : "hover:bg-[#f3f4f6]"
                                    }`
                                }
                            >
                                <FaExclamationTriangle className="text-yellow-500" /> Reports Log
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/user"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 font-semibold text-sm text-gray-700 rounded-md px-4 py-2 transition ${isActive ? "bg-[#f3f4f6]" : "hover:bg-[#f3f4f6]"
                                    }`
                                }
                            >
                                <FaUsersCog className="text-green-600" /> Manage Users
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/announcement"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 font-semibold text-sm text-gray-700 rounded-md px-4 py-2 transition ${isActive ? "bg-[#f3f4f6]" : "hover:bg-[#f3f4f6]"
                                    }`
                                }
                            >
                                <FaBullhorn className="text-orange-500" /> Create Notice
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}

            <div className="bg-white rounded-xl px-4 py-2 shadow-sm mb-5">
                <h1 className="text-xl font-medium px-4 py-4">Popular Tags</h1>

                <div className="flex gap-2 overflow-x-auto lg:grid lg:grid-cols-1 lg:overflow-visible scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-1">
                    {tags.map((tag) => {
                        const tagName = tag.tagName.toLowerCase();
                        const Icon = tagIcons[tagName] || <span className="text-gray-400">#</span>;

                        return (
                            <button
                                key={tag._id}
                                onClick={() =>
                                    setSelectedTag((prev) => (prev === tag.tagName ? null : tag.tagName))
                                }
                                className={`flex items-center gap-2 flex-shrink-0 min-w-[140px] font-semibold text-left text-sm text-gray-700 rounded-md px-4 py-2 transition
            ${selectedTag === tag.tagName ? "bg-[#f3f4f6]" : "hover:bg-[#f3f4f6]"}
          `}
                            >
                                {Icon} #{tag.tagName}
                            </button>
                        );
                    })}
                </div>
            </div>


        </>
    );
};

export default LeftNav;
