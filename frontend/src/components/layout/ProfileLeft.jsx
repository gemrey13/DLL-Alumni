import React from 'react';
import avatarMale from '../../assets/avatar-male.jpg';

const ProfileLeft = () => {
  return (
    <>
      <div className="mr-20 w-1/3">
        Left Side
        <img src={avatarMale} alt="" width="250" className="relative mx-auto" />
        <br />
        <br />
        
        <div className="flex mt-10 text-lg">
          <h5 className="mr-10">Send Message</h5>
          <h5 className="mr-10">Facebook</h5>
          <h5>Twitter</h5>
        </div>
      </div>
    </>
  );
};

export default ProfileLeft;
