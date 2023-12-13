import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import importdata_icon from "../../images/importdata_icon.png";
import dashboard_icon from "../../images/dashboard_icon.png";
import visualization_icon from "../../images/visualization_icon.png";
import trace_icon from "../../images/trace_icon.png";
import settings_icon from "../../images/settings_icon.png";

function SidebarLinks() {
  let location = useLocation()
  let path = location.pathname
  return (
    <>
      {/* Sidebar content here */}
      <div className="text-base">
        <li>
          <NavLink
            to="/admin/dashboard"
            className="text-slate-600 text-xl"
          >
            <img
              src={dashboard_icon}
              alt="dashboard_icon"
              className="w-6 mr-3"
            />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/trace-alumni" className="text-xl text-slate-600">
            <img src={trace_icon} alt="dashboard_icon" className="w-6 mr-3" />
            Trace Alumni
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/visualization" className="text-xl text-slate-600">
            <img
              src={visualization_icon}
              alt="dashboard_icon"
              className="w-6 mr-3"
            />
            Visualization
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/import-data" className="text-xl text-slate-600">
            <img
              src={importdata_icon}
              alt="dashboard_icon"
              className="w-6 mr-3"
            />
            Import Data
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className="text-xl text-slate-600">
            <img
              src={settings_icon}
              alt="dashboard_icon"
              className="w-6 mr-3"
            />
            Settings
          </NavLink>
        </li>
      </div>
    </>
  );
}

export default SidebarLinks;
