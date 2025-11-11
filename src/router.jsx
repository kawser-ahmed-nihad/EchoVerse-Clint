import { createBrowserRouter, } from "react-router";
import React from "react";
import Layout from "./Layout/Layout";
import LoginLayout from "./Layout/LoginLayout";
import Login from "./Pages/Auth/login/Login";
import Resgister from "./Pages/Auth/Resgister/Resgister";
import Home from "./Pages/Home/Home/Home";
import AddPost from "./Pages/Home/AddPost/AddPost";
import PrivateRoute from "./routes/PrivateRoute";
import PostDetails from "./Pages/Home/PostDetails/PostDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import MyPosts from "./Pages/Home/MyPosts/MyPosts";
import AdminLayout from "./Layout/AdminLayout";
import CommentsDetails from "./Pages/Home/CommentsDetails/CommentsDetails";
import AddTags from "./Pages/AddTags/AddTags";
import AdminReportsPage from "./Pages/AdminReportsPage/AdminReportsPage";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import Announcement from "./Pages/Announcement/Announcement";
import PaymentPage from "./Pages/Membership/PaymentPage/PaymentPage";
import Contact from "./Pages/Shared/Contact";
import AboutUs from "./Pages/Shared/AboutUs";
import AdminRoute from "./context/PrivateRoute/AdminRoute";
import NotFoundPage from "./Pages/Shared/NotFoundPage/NotFoundPage";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'add-post',
                element: <AddPost></AddPost>
            },
            {
                path: "/posts/:id",
                element: <PrivateRoute> <PostDetails></PostDetails></PrivateRoute>
            },
            {
                path: "membership",
                element: <PrivateRoute> <PaymentPage></PaymentPage></PrivateRoute>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
            {
                path: "about",
                element: <AboutUs />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><AdminLayout></AdminLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: UserProfile
            },
            {
                path: "my-posts",
                Component: MyPosts
            },
            {
                path: 'comments/:postId',
                element: <CommentsDetails></CommentsDetails>
            },
            {
                path: 'add-tags',
                element: <AdminRoute><AddTags></AddTags></AdminRoute>
            },
            {
                path: 'reported-activities',
                element: <AdminRoute><AdminReportsPage></AdminReportsPage></AdminRoute>
            },
            {
                path: 'user',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'announcement',
                element: <ManageUsers><Announcement></Announcement></ManageUsers>
            },
        ]

    },
    {
        path: "/auth",
        Component: LoginLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "resgister",
                Component: Resgister
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    }
]);

