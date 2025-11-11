import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Nav from '../Pages/Shared/Nav';
import LeftNav from '../Pages/Shared/LeftNav';
import RightNav from '../Pages/Shared/RightNAv';
import { useSearch } from '../context/SearchContext/SearchContext';

const Layout = () => {
    // const [selectedTag, setSelectedTag] = useState(null);
    // const [searchTerm, setSearchTerm] = useState('');
    // const location = useLocation();
    const { searchTerm, setSearchTerm, selectedTag, setSelectedTag } = useSearch();
    useEffect(() => {
        if (selectedTag) {
            setSearchTerm('');
        }
    }, [selectedTag]);


    const isMinimalPage =
        ['/add-post', '/profile', '/membership' ,'/contact' ,'/about'].includes(location.pathname) ||
        location.pathname.startsWith('/posts/');

    return (
        <div className="bg-[#f7f7f7] ">
            <Nav setSearchTerm={setSearchTerm} />


            {isMinimalPage ? (
                <div className="pt-24 max-w-11/12 mx-auto pb-10">
                    <Outlet />
                </div>
            ) : (

                <div className="grid lg:grid-cols-12 max-w-11/12 mx-auto pt-24">
                    <aside className="hidden lg:flex col-span-2">
                        <div className="sticky top-24 mb-10">
                            <LeftNav selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                        </div>
                    </aside>

                    <div className="col-span-7 overflow-hidden pb-10">
                        <Outlet context={{ searchTerm, selectedTag }} />
                    </div>

                    <aside className=" hidden lg:flex col-span-3">
                        <div className="sticky top-24">
                            <RightNav />
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Layout;
