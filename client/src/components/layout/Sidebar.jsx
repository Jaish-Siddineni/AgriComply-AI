import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaSeedling, FaArchive, FaSignOutAlt } from 'react-icons/fa';
// 1. Import useAuth
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  // 2. Get the logout function
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path 
    ? "bg-green-50 text-green-700 border-r-4 border-green-600" 
    : "text-gray-600 hover:bg-gray-50";

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link to={to} className={`flex items-center gap-3 p-3 transition-colors ${isActive(to)}`}>
      <Icon className="text-lg" />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col justify-between hidden md:flex">
      <div>
        <div className="p-6 border-b">
          <span className="text-2xl font-extrabold text-green-800">AgriAI</span>
        </div>
        <nav className="mt-6 flex flex-col gap-1">
          <NavItem to="/" icon={FaHome} label="Dashboard" />
          <NavItem to="/vault" icon={FaArchive} label="Document Vault" />
          <div className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">Tracks</div>
          <NavItem to="/compliance" icon={FaFileAlt} label="Compliance" />
          <NavItem to="/growth" icon={FaSeedling} label="Growth & Loans" />
        </nav>
      </div>
      
      <div className="p-4 border-t">
        {/* 3. Add onClick handler */}
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 w-full px-4 py-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;