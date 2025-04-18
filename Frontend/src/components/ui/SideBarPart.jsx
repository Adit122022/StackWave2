import {
  Home,
  User,
  FileQuestion,
  Tag,
  ChartBarIcon,
  MessageCircle,
  LogOut,
  Menu as MenuIcon,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const SideBarPart = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2  dark:bg-gray-800 rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64   shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <nav className="flex flex-col h-full p-4 space-y-2">

          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-emerald-100  hover:text-black ${
                  isActive ? 'bg-emerald-200 text-black dark:bg-emerald-700' : 'text-gray-600 dark:text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 transition mt-auto"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};
