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
        <h1>Work</h1>
        <hr />
        <p>
          Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.Aut minima maxime,
          <br /> aliquid, excepturi pariatur amet voluptatem fugit
          <br /> corrupti debitis similique omnis nam laudantium <br />
          ex atque corporis consectetur praesentium,
          <br /> repellendus modi.
        </p>
        <br />
        <br />
        <h1>Skills</h1>
        <hr />
        <ol>
          <li>Computer Programming</li>
          <li>Excel</li>
          <li>Web Design</li>
        </ol>
      </div>
    </>
  );
};

export default ProfileLeft;
