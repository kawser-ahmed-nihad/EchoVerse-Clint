import React from 'react';
import PostList from '../PostList.jsx/PostList';
import LeftNav from '../../Shared/LeftNav';

const Home = () => {
    return (
        <div>
            <div className='flex lg:hidden'>
                <LeftNav></LeftNav>

            </div>
            <PostList ></PostList>

        </div>
    );
};

export default Home;