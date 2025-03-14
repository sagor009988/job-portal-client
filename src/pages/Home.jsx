import React from 'react';
import Banner from '../components/Banner';
import HotNews from './hotNews/HotNews';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HotNews></HotNews>
        </div>
    );
};

export default Home;