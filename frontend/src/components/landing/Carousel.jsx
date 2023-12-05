import React from 'react'
import HoverCarousel from "hover-carousel";
import carousel_1 from '../../images/carousel-1.png'
import carousel_2 from '../../images/carousel-2.png'
import carousel_3 from '../../images/carousel-3.png'
import carousel_4 from '../../images/carousel-4.png'
import news_4 from '../../images/news-4.png'
import carousel_5 from '../../images/carousel-5.png'

function Carousel() {
    const images = [
        carousel_1,
        carousel_2,
        carousel_3,
        carousel_4,
        carousel_5,
    ];

    return (
        <div className='mt-10 mb-40'>
            <HoverCarousel images={images} style={{width:'60%'}}/>
        </div>
    )
}

export default Carousel