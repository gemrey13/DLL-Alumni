import React from 'react'
import sample from '@assets/sample.jpg'

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-green-400">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={sample} className="max-w-sm rounded-lg shadow-2xl w-72 lg:w-96 mt-20 md:mt-0" />
            <div>
              <h1 className="text-5xl font-bold">Unite. Empower. Thrive.</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
  )
}