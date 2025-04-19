import {
  Home,
  User,
  FileQuestion,
  Tag,
  ChartBarIcon,
  MessageCircle,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const SideBarPart = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
      window.location.reload();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message || 'Logout Failed');
    }
  };

  const links = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
    { to: '/question', label: 'Question', icon: <FileQuestion size={20} /> },
    { to: '/tags', label: 'Tags', icon: <Tag size={20} /> },
    { to: '/discussion', label: 'Discussion', icon: <ChartBarIcon size={20} /> },
    { to: '/chat', label: 'Chat', icon: <MessageCircle size={20} /> },
    { to: '/users', label: 'Users', icon: <User size={20} /> },
  ];

  return (

      <aside className=" fixed top-50 lg:w-64   text-white shadow-lg">
      <nav className="flex flex-col h-full lg:p-4  space-y-2">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-primary hover:text-black ${
                isActive ? 'bg-primary text-black' : 'text-gray-600 dark:text-gray-300'
              }`
            }
          >
            {icon}
            {/* Show label only on larger screens */}
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:text-white hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 transition mt-auto"
        >
          <LogOut size={20} />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </nav>
    </aside>
  );
};
