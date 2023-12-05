import React from 'react'

function Location() {
  return (
    <div className="hero mt-11 min-h-screen bg-gradient-to-r from-zinc-900 via-slate-900 to-neutral-900">
        <div className="hero-content flex-col lg:flex-row-reverse w-[90%] justify-between items-center">
            <div className='w-[90%] lg:w-[60%]'>
                <iframe
                    title="Google Map"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=13.946502610251546,%20121.58970437784215+(Dalubhasaan%20ng%20Lungsod%20ng%20Lucena)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                >
                    <a href="https://www.maps.ie/population/">Population Estimator map</a>
                </iframe>
            </div>
            <div className='w-[90%] lg:w-[20%]'>
                <section>
                    <h1 className="text-lg md:text-3xl font-bold text-white">Address</h1>
                    <p className="pb-16 text-base text-gray-500">WHWQ+HVP, Annex Building Brgy, Lucena, 4301 Quezon</p>    
                </section>
                <section>
                    <h1 className="text-lg md:text-3xl font-bold text-white">Email</h1>
                    <p className="pb-16 text-gray-500">dllalumni@example.org</p>
                </section>
                <section>
                    <h1 className="text-lg md:text-3xl font-bold text-white">Facebook</h1>
                    <p className="pb-16 text-gray-500 max-w-sm">https://www.facebook.com/ DLLAlumniAssociation</p>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Location