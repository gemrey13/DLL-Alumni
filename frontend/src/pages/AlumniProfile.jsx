import React, { useState, useEffect } from 'react';
import { Navbar, Breadcrumb } from '../index';
import avatarMale from '../assets/avatar-male.jpg';




const AlumniProfile = () => {
    return (
        <>
            <div className='text-black dark:text-white ml-4 sm:mr-4 my-20 sm:ml-24 sm:my-24'>
                <Navbar />
                <Breadcrumb url='Tracer' url2='Profile'/>

                <div className='flex'>
                    <div className='mr-20'>
                        Left Side

                        <img src={avatarMale} alt="" width='250' className="relative mx-auto" />
                        <br /><br />
                        <h1>Work</h1>
                        <hr />
                        <p> Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.Aut minima maxime,<br /> aliquid, excepturi pariatur amet voluptatem fugit<br />  corrupti debitis similique omnis nam laudantium <br />ex atque corporis consectetur praesentium,<br /> repellendus modi. </p>

                        <br /><br />
                        <h1>Skills</h1>
                        <hr />
                        <ol>
                            <li>Computer Programming</li>
                            <li>Excel</li>
                            <li>Web Design</li>
                        </ol>

                    </div>
                    <div className='grow'>
                        Right Side
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-3xl'>Gem Rey B. Ranola<sup className='text-sm'> | Philippines</sup></h1>
                                <p className='text-blue-600'>Software Developer</p>
                            </div>
                            <div className='flex flex-nowrap'>
                                <h1 className='mr-6'>Save</h1>
                                <h1>Delete</h1>
                            </div>
                            
                        </div>

                        <div className='flex mt-10 text-lg'>
                            <h5 className='mr-10'>Send Message</h5>
                            <h5 className='mr-10'>Facebook</h5>
                            <h5>Twitter</h5>
                        </div>

                        <div className='flex mt-12 '>
                            <h1 className='mr-6'>Personal Info</h1>
                            <h1 className='mr-6'>Educational Attainment</h1>
                            <h1 className='mr-6'>Job Record</h1>
                            <h1>Account</h1>
                        </div>
                        <hr />
                    </div>
                </div>

            </div>
        </>
    )
};

export default AlumniProfile;