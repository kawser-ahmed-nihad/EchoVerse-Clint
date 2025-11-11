import React from 'react';
import useAuth from '../../hooks/useAuth';
import AdminProfile from '../Admin/AdminProfile';
import MyProfile from '../Home/MyProfile/MyProfile';
import useAdmin from '../../hooks/useAdmin';
import { FaUserFriends, FaImages } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import { Link, Outlet } from 'react-router';


const UserProfile = () => {
  const { user } = useAuth();

  const [isAdmin] = useAdmin();

  // console.log(isAdmin);

  if (!user) {
    return;
  }


  if (isAdmin) {
    return <AdminProfile />;
  }


  return <MyProfile />;

};

export default UserProfile;