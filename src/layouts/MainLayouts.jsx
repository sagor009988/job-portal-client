import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/shared/Footer';
import Navbar from '../pages/shared/Navbar';

const MainLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div >
            <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayouts;