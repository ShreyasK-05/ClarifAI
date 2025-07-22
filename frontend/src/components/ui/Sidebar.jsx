import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const commonClasses = "flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-lg transition-colors";
  const activeClasses = "bg-gray-200 text-gray-900 font-bold";

  return (
    <aside className="w-56 flex-shrink-0 bg-gray-50 p-4 h-screen sticky top-16 border-r border-gray-200">
      <nav className="space-y-2">
        <NavLink
          to="/home/questions"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : ''}`}
        >
          <span className="ml-3">Questions</span>
        </NavLink>
        <NavLink
          to="/home/tags"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : ''}`}
        >
          <span className="ml-3">Tags</span>
        </NavLink>
        <NavLink
          to="/home/saves"
          className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : ''}`}
        >
          <span className="ml-3">Saves</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
