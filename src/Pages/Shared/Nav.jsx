import React, { useEffect, useRef, useState } from "react";
import { IoNotifications, IoSearchSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useSearch } from "../../context/SearchContext/SearchContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Nav = () => {
  const { user, logOut, loading } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { setSearchTerm } = useSearch();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  // Fetch announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/announcements");
      return res.data;
    },
  });

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire("Logged out!", "", "success");
      }
    });
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      setSearchTerm(searchText.trim());
      setSearchText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-white shadow-sm z-10 fixed top-0 w-full">
      <div className="flex items-center justify-between px-3 md:px-0 max-w-11/12 mx-auto py-3">

        {/* Left side (Logo + Search) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="flex items-center" to='/'>
            <svg
              width="36"
              height="36"
              viewBox="0 0 56 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-w-[32px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.3333 0C23.7194 0 24.1033 0.00932962 24.4847 0.0280265C24.4924 0.0284028 24.4989 0.0222809 24.4989 0.0145938V0.0145938C24.4989 0.00716838 24.5049 0.0011489 24.5123 0.0011489H45.8418C46.2974 0.00137965 46.6667 0.373466 46.6667 0.83295C46.6666 1.05356 46.5798 1.26515 46.4251 1.42119L40.8322 7.05882H52.7444C53.5415 7.05882 54.27 7.52957 54.5456 8.27757C55.4857 10.829 56 13.5892 56 16.4706C56 29.4655 45.5533 40 32.6667 40C32.2808 40 31.8971 39.9896 31.5158 39.9709C31.5078 39.9705 31.5011 39.9768 31.5011 39.9848V39.9848C31.5011 39.9926 31.4949 39.9989 31.4871 39.9989H10.1582C9.7026 39.9986 9.33333 39.6265 9.33333 39.1671C9.33336 38.9464 9.42022 38.7348 9.57487 38.5788L15.1655 32.9412H3.25562C2.45846 32.9412 1.73002 32.4704 1.4544 31.7224C0.514256 29.171 0 26.4109 0 23.5294C0 10.5345 10.4467 0 23.3333 0ZM31.3177 16.6556C29.3919 14.383 26.5301 12.9412 23.3333 12.9412C17.5343 12.9412 12.8333 17.6817 12.8333 23.5294C12.8333 24.7672 13.0456 25.9547 13.4326 27.0588H20.9989L24.6823 23.3444C26.6081 25.617 29.4699 27.0588 32.6667 27.0588C38.4657 27.0588 43.1667 22.3183 43.1667 16.4706C43.1667 15.2328 42.9544 14.0453 42.5674 12.9412H35.0011L31.3177 16.6556Z"
                fill="#ff6933"
              ></path>
            </svg>

            <h1 className="hidden md:flex text-xl lg:text-2xl text-black ml-2 font-semibold">
              EchoVerse
            </h1>
          </Link>

          {/* Search box */}
          <div className="bg-[#f9f9f9] flex items-center rounded-md relative ml-2 sm:ml-4 w-[240px] sm:w-[220px] md:w-[280px] lg:w-[340px]">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="placeholder:text-gray-500 py-2 pl-3 pr-10 outline-none text-black bg-transparent text-sm sm:text-base w-full rounded-md"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white rounded-md shadow-sm"
            >
              <IoSearchSharp size={18} className="text-black" />
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-black">
          {[
            { to: "/", label: "Home" },
            { to: "/membership", label: "Membership" },
            { to: "/contact", label: "Contact" },
            { to: "/about", label: "About Us" },
          ].map((link) => (
            <li key={link.to} className="group">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-all duration-300 ${isActive ? "text-[#ff6933] font-semibold" : ""
                  } group-hover:text-[#ff6933]`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <div className="bg-[#fafafa] p-2 rounded-full">
              <IoNotifications size={22} className="text-black" />
            </div>
            {announcements.length > 0 && (
              <span className="bg-[#ff6934] text-white text-xs w-4 h-4 rounded-full absolute -top-1 right-0 flex items-center justify-center">
                {announcements.length}
              </span>
            )}
          </div>

          {/* Auth Section */}
          {loading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-4 border-[#ff6934]/30 border-t-[#ff6934] rounded-full animate-spin"></div>
            </div>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1"
              >
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-44 z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/auth/login"
              className="hidden sm:flex bg-[#ff6934] text-white px-4 py-2 rounded hover:bg-[#e35b2c] transition text-sm sm:text-base"
            >
              Join Us
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
