import React from 'react'
import icon_alumni from '../../images/icon-alumni.png'
import me from '../../images/me.png'
import importdata_icon from '../../images/importdata_icon.png'
import dashboard_icon from '../../images/dashboard_icon.png'
import visualization_icon from '../../images/visualization_icon.png'
import trace_icon from '../../images/trace_icon.png'
import settings_icon from '../../images/settings_icon.png'
import Dashboard from './Dashboard'
import RightBar from '../../components/admin/RightBar'
import notif from '../../images/notif.png'


function AdminPage() {
  return (
    <>
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-200">
            <header className='flex justify-between items-center p-4 lg:hidden'>
                <label htmlFor="my-drawer-2" className="drawer-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                
                <h1 className='text-2xl text-purple-900 font-semibold block lg:hidden'>Dashboard</h1>

                <button type='submit' className='w-6 right-2 top-2'>
                    <img src={notif} alt="notif"/>
                </button>
            </header>
            {/* Page content here */}
            
            <section className='lg:flex block'>
                <Dashboard />
                <RightBar />
            </section>
        </div> 


        
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu flex justify-between p-6 w-72 md:w-64 min-h-full bg-slate-200 border-r border-r-gray-300 text-base-content">

                <div className='flex justify-center items-center'>
                    <div className='w-[40%] flex justify-center'>
                        <img src={icon_alumni} alt="icon_alumni" />
                    </div>
                    <h1 className='text-xl text-purple-950 font-semibold'>DLL Alumni Association</h1>
                </div>
                {/* Sidebar content here */}
                <div className='text-base'>
                    <li><a className='font-semibold text-purple-800 text-xl'><img src={dashboard_icon} alt="dashboard_icon" className='w-6 mr-3'/>Dashboard</a></li>
                    <li><a className='text-xl text-slate-600'><img src={trace_icon} alt="dashboard_icon" className='w-6 mr-3'/>Trace Alumni</a></li>
                    <li><a className='text-xl text-slate-600'><img src={visualization_icon} alt="dashboard_icon" className='w-6 mr-3'/>Visualization</a></li>
                    <li><a className='text-xl text-slate-600'><img src={importdata_icon} alt="dashboard_icon" className='w-6 mr-3'/>Import Data</a></li>
                    <li><a className='text-xl text-slate-600'><img src={settings_icon} alt="dashboard_icon" className='w-6 mr-3'/>Settings</a></li>
                </div>

                <div className='flex justify-evenly items-center'>
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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

export default AdminPage