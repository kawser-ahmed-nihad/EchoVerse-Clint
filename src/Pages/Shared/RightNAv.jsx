import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
const RightNav = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: announcements = [],
        refetch,
        isLoading: announcementsLoading,
    } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/announcements');
            return res.data;
        },
    });
    // console.log(announcements);

    return (

        <>
            {
                announcements.length > 0 && (
                    <div className="bg-white rounded-md p-5 space-y-4 shadow-sm ">
                        <h1 className="font-semibold text-xl text-black">Announcements</h1>

                        {announcements.map((announcement) => {
                            const date = new Date(announcement.createdAt);
                            const month = format(date, "MMM"); // First 3 letters of month
                            const day = format(date, "d"); // Day of month

                            return (
                                <div key={announcement._id} className="flex items-center space-x-4 border-t py-2 border-b-gray-700">
                                    {/* Date */}
                                    <div className="space-x-1 text-center">
                                        <h1 className="text-2xl">{month}</h1>
                                        <h1 className="text-[#78a6ec] text-2xl">{day}</h1>
                                    </div>

                                    {/* Announcement content */}
                                    <div>
                                        <h1 className="text-gray-800 text-xl">{announcement.title}</h1>
                                        <p className="text-sm text-black">{announcement.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </>

    );
};

export default RightNav;
