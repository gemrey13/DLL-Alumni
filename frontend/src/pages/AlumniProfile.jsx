import React, { useState, useEffect } from 'react';
import { Navbar, Breadcrumb } from '../index';



const AlumniProfile = () => {
    return (
        <>
            <div className='text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24'>
                <Navbar />
                <Breadcrumb url='profile'/>
            </div>
        </>
    )
};

export default AlumniProfile;