import React from 'react';


const ProfileRight = () => {
	return (
		<>
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
			
		</>
	)
};

export default ProfileRight;