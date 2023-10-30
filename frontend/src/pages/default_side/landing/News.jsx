import React from 'react'
import design1 from '@assets/design1.jpg'
import design3 from '@assets/design3.jpg'
import design2 from '@assets/design2.jpg'


export default function News() {
  return (
    // <div className='flex justify-center'>
    // <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
    //     <div className="carousel-item">
    //         <img src={design1} className="rounded-box w-72" />
    //     </div> 
    //     <div className="carousel-item">
    //         <img src={design2} className="rounded-box w-72" />
    //     </div> 
    //     <div className="carousel-item">
    //         <img src={design3} className="rounded-box w-72" />
    //     </div> 
    // </div>
    // </div>
    <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
            <img src={design1} className="w-72" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a> 
            <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
        </div> 
        <div id="slide2" className="carousel-item relative w-full">
            <img src={design2} className="w-72" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a> 
            <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
        </div> 
        <div id="slide3" className="carousel-item relative w-full">
            <img src={design3} className="w-72" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a> 
            <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
        </div> 
    </div>
  )
}
