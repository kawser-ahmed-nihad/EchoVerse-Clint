import React, { useEffect } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router';
import Nav from '../Pages/Shared/Nav';
import LeftNav from '../Pages/Shared/LeftNav';
import RightNav from '../Pages/Shared/RightNAv';
import { useSearch } from '../context/SearchContext/SearchContext';
import PostList from '../Pages/Home/PostList.jsx/PostList';
import { FaRegFileAlt, FaCommentDots } from "react-icons/fa";
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const fetchUser = async (axiosSecure, email) => {
  const res = await axiosSecure.get(`/api/users/${encodeURIComponent(email)}`);
  return res.data;
};


const AdminLayout = () => {
  const { searchTerm, setSearchTerm, selectedTag, setSelectedTag } = useSearch();
  const { user: authUser } = useAuth();
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();

  const userEmail = authUser?.email;
  // console.log(userEmail);

  const { data: user } = useQuery({
    queryKey: ['user', userEmail],
    queryFn: () => fetchUser(axiosSecure, userEmail),
    enabled: !!userEmail,
  });

  // console.log(user);

  // const showBronze = user?.status === 'bronze';
  // const showGold = user?.status === 'gold';

  useEffect(() => {
    if (selectedTag) setSearchTerm('');
  }, [selectedTag]);

  // const hideProfile = location.pathname.includes("/dashboard/add-tags");

  const hideProfile =
    ['/dashboard/add-tags', '/dashboard/reported-activities', '/dashboard/user', '/dashboard/announcement'].includes(location.pathname)
  return (
    <div className="bg-[#f7f7f7]">
      <Nav setSearchTerm={setSearchTerm} />

      <div className="grid lg:grid-cols-12 max-w-11/12 mx-auto pt-24">

        {/* LEFT NAV */}
        <aside className=" hidden lg:flex col-span-2">
          <div className="sticky top-24 mb-10">
            <LeftNav selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="col-span-7 overflow-hidden pb-10 px-5">


          {searchTerm || selectedTag ? (
            <>
              <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => { setSearchTerm(""); setSelectedTag(null); }}
              >
                Back to Dashboard
              </button>
              <PostList searchTerm={searchTerm} selectedTag={selectedTag} />
            </>
          ) : (
            <>

              {!hideProfile && (
                <>
                  {/* Profile Card */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img
                        src="https://img.freepik.com/free-photo/blue-abstract-background_53876-88666.jpg"
                        alt="cover"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute left-6 -bottom-12">
                        <img
                          src={authUser.photoURL}
                          alt="avatar"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
                    </div>

                    <div className="pt-16 pb-4 px-6">
                      <h2 className="text-2xl font-semibold">
                        {authUser?.displayName?.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {user?.status}
                        {/* {showGold && "Gold Badge "} */}
                        {isAdmin && <span className="text-blue-600">Admin!</span>}
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-5">
                    <div className="flex gap-10 px-6 py-4  text-gray-600 font-medium">

                      <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-2 pb-1 border-b-2 ${isActive
                            ? "text-[#ff6933] border-[#ff6933]"
                            : "text-gray-600 border-transparent hover:text-[#ff6933]"
                          }`
                        }
                      >
                        <FaRegFileAlt /> My Posts
                      </NavLink>

                      <NavLink
                        to="/dashboard/my-posts"
                        className={({ isActive }) =>
                          `flex items-center gap-2 pb-1 border-b-2 ${isActive
                            ? "text-[#ff6933] border-[#ff6933]"
                            : "text-gray-600 border-transparent hover:text-[#ff6933]"
                          }`
                        }
                      >
                        <FaCommentDots /> My Comments
                      </NavLink>

                    </div>
                  </div>
                </>
              )}
            </>
          )}


          <Outlet />
        </div>

        {/* RIGHT NAV */}
        <aside className=" hidden lg:flex col-span-3">
          <div className="sticky top-24">
            <RightNav />
          </div>
        </aside>

      </div>
    </div>
  );
};

export default AdminLayout;
