import React from 'react'

function EmploymentRateBox() {
  return (
    <div className="w-[64%] h-36 bg-white rounded-2xl shadow flex items-center mb-6 px-5 py-2">

            <aside className='w-[60%]'>
                <h3 className='text-xl font-semibold text-purple-900 pb-1'>Employment Rate Box</h3>
                <div className="max-w-screen-md text-sm text-stone-400">
                    <div className="flex items-center">
                        <p className='w-1/3'>Employed</p>
                        <p className='w-1/3 text-right'>Orange</p>
                        <p className='w-1/3 text-right'>35%</p>
                    </div>

                    <div className="flex items-center">
                        <p className='w-1/3'>Unemployed</p>
                        <p className='w-1/3 text-right'>Green</p>
                        <p className='w-1/3 text-right'>20%</p>
                    </div>

                    <div className="flex items-center justify-around">
                        <p className='w-1/3'>Self Employed</p>
                        <p className='w-1/3 text-right'>Violet</p>
                        <p className='w-1/3 text-right'>35%</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className='w-1/3'>Part-Time</p>
                        <p className='w-1/3 text-right'>Blue</p>
                        <p className='w-1/3 text-right'>10%</p>
                    </div>
                </div>
            </aside>

            <aside className='w-[40%] flex justify-center'>
                <svg width="92" height="99" viewBox="0 0 90 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M89.0811 48.4319C89.0811 58.6597 86.1033 68.625 80.5746 76.8994C75.0459 85.1739 67.25 91.3328 58.3043 94.4933C49.3587 97.6539 39.7224 97.6539 30.7768 94.4933C21.8311 91.3328 14.0352 85.1739 8.50648 76.8994L22.9201 65.5124C26.2373 70.4771 30.9149 74.1724 36.2823 76.0687C41.6497 77.9651 47.4314 77.9651 52.7988 76.0687C58.1662 74.1724 62.8437 70.4771 66.161 65.5124C69.4782 60.5477 71.2649 54.5686 71.2649 48.4319H89.0811Z" fill="#F4BE37"/>
                    <path d="M25.2717 92.0971C18.5078 88.5679 12.6733 83.2382 8.30961 76.6024L22.802 65.3342C25.4202 69.3157 28.9209 72.5135 32.9792 74.631L25.2717 92.0971Z" fill="#FF9F40"/>
                    <path d="M30.6035 2.43205C37.3023 0.0323383 44.4294 -0.603288 51.3982 0.577485C58.367 1.75826 64.9784 4.72167 70.6881 9.22383C76.3978 13.726 81.0426 19.6382 84.2403 26.4738C87.4379 33.3094 89.097 40.873 89.081 48.5421L71.2648 48.498C71.2744 43.8965 70.279 39.3584 68.3604 35.257C66.4418 31.1556 63.6549 27.6083 60.2291 24.907C56.8032 22.2058 52.8364 20.4277 48.6551 19.7192C44.4739 19.0108 40.1976 19.3922 36.1783 20.832L30.6035 2.43205Z" fill="#5388D8"/>
                    <path d="M8.61752 77.0649C4.46198 70.9005 1.70714 63.7543 0.578222 56.2105C-0.550695 48.6666 -0.021631 40.9394 2.12216 33.6605C4.26595 26.3816 7.96359 19.7577 12.9128 14.3304C17.8619 8.90318 23.9221 4.82663 30.5978 2.4341L36.1749 20.8332C32.1695 22.2687 28.5334 24.7147 25.5639 27.971C22.5944 31.2274 20.3758 35.2017 19.0895 39.569C17.8032 43.9364 17.4858 48.5727 18.1631 53.099C18.8405 57.6253 20.4934 61.9131 22.9867 65.6117L8.61752 77.0649Z" fill="#0D2535"/>
                </svg>
            </aside>


    </div>
  )
}

export default EmploymentRateBox