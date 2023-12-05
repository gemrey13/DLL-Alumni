import React from 'react'
import icon_alumni from '../../images/icon-alumni.png'
import me from '../../images/me.png'
import importdata_icon from '../../images/importdata_icon.png'
import dashboard_icon from '../../images/dashboard_icon.png'
import visualization_icon from '../../images/visualization_icon.png'
import trace_icon from '../../images/trace_icon.png'
import settings_icon from '../../images/settings_icon.png'


function Dashboard() {
  return (
    <>
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            {/* Page content here */}dsfds 

        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu flex justify-between p-4 w-64 min-h-full bg-base-200 border-r border-r-gray-300 text-base-content">

                <div className='flex justify-center items-center'>
                    <div className='w-[40%] flex justify-center'>
                        <img src={icon_alumni} alt="icon_alumni" />
                    </div>
                    <h1 className='text-xl text-purple-950 font-semibold'>DLL Alumni Association</h1>
                </div>
                {/* Sidebar content here */}
                <div className='text-base'>
                    <li><a><img src={dashboard_icon} alt="dashboard_icon" className='w-6'/>Dashboard</a></li>
                    <li><a><img src={trace_icon} alt="dashboard_icon" className='w-6'/>Trace Alumni</a></li>
                    <li><a><img src={visualization_icon} alt="dashboard_icon" className='w-6'/>Visualization</a></li>
                    <li><a><img src={importdata_icon} alt="dashboard_icon" className='w-6'/>Import Data</a></li>
                    <li><a><img src={settings_icon} alt="dashboard_icon" className='w-6'/>Settings</a></li>
                </div>

                <div className='flex justify-evenly'>
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={me} />
                        </div>
                    </div>

                    <div>
                        <h1 className='text-xl text-purple-950 font-semibold'>Gem Rey Rañola</h1>
                        <p className='font-medium text-gray-400'>Admin</p>
                    </div>
                </div>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Dashboard