import React from 'react'
import news_1 from '../../images/news-1.png'
import news_2 from '../../images/news-2.png'
import news_3 from '../../images/news-3.png'
import news_4 from '../../images/news-4.png'

function News() {
  return (
    <>
    <div className='hidden lg:flex px-20 justify-between text-2xl mt-20 mb-8'>
        <h2 className='w-[83%]'>Latest News</h2>
        <h2 className='w-[18%]'>System Updates</h2>
    </div>
    <section className='block lg:flex px-7 lg:px-20 mt-10 md:mt-0'>
        <div className='block lg:flex bg-gray-950 justify-between lg:mr-11'>
            <div className='w-[100%] lg:w-[30%] p-5'>
                <h2 className='text-white text-2xl'>New Feature Alert: Introducing Alumni Mentorship Program!</h2>
                <p className='text-red-600'>November 1, 2023</p>
                <p className='text-gray-400 text-xl'>As part of our commitment to empowering our students and recent graduates, this program connects them with experienced alumni mentors in their chosen fields.</p>
            </div>
            <div className='w-[70%]'>
                <img src={news_1} alt="News 1" className=''/>
            </div>
        </div>
        <aside>
            <div className='flex mb-7'>
                <div className='text-3xl underline mr-4'>1</div>
                <div>
                    <h2 className='text-red-700 font-bold'>Enhancing Your Experience</h2>
                    <p>Our latest system update includes performance enhancements and bug fixes to ensure a smoother and more reliable experience for all users</p>
                </div>
            </div>
            <div className='flex mb-7'>
                <div className='text-3xl underline mr-4'>2</div>
                <div>
                    <h2 className='text-red-700 font-bold'>The Latest Update</h2>
                    <p>Our new system update optimizes efficiency and introduces exciting features for a more productive experience.</p>
                </div>
            </div>
            <div className='flex'>
                <div className='text-3xl underline mr-4'>3</div>
                <div>
                    <h2 className='text-red-700 font-bold'>What's New?</h2>
                    <p>Explore our latest feature additions that enhance your experience and provide even more capabilities.</p>
                </div>
            </div>
            
        </aside>
    </section>
    <section className='flex px-20 mt-8 justify-evenly'>
        <div className='flex-col'>
            <div className='w-[70%]'>
                <img src={news_2} alt='News 2'></img>
            </div>
            <div className='w-[70%]'>
                <p className='text-gray-800 font-semibold mt-2'>Debating for a Brighter Tomorrow: Exploring Contemporary Issues</p>
                <p>October 26, 2023 • 3:28 PM</p>
            </div>
        </div>
        <div className='flex-col'>
            <div className='w-[70%]'>
                <img src={news_3} alt='News 3'></img>
            </div>
            <div className='w-[70%]'>
                <p className='text-gray-800 font-semibold mt-2'>Culinary Creations: A Flavorful Showdown</p>
                <p>October 26, 2023 • 3:28 PM</p>
            </div>
        </div>
        <div className='flex-col'>
            <div className='w-[70%]'>
                <img src={news_4} alt='News 4'></img>
            </div>
            <div className='w-[70%]'>
                <p className='text-gray-800 font-semibold mt-2'>Stride for Success: School Fun Run Extravaganza</p>
                <p>October 26, 2023 • 3:28 PM</p>
            </div>
        </div>
    </section>
    </>
  )
}

export default News