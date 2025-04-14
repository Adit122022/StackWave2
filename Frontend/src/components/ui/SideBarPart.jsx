import {
  ChartBarIcon,
  FileQuestion,
  Home,
  MessageCircle,
  Tag,
  User,
  Menu as MenuIcon,
  LogOut,
} from 'lucide-react';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink, useNavigate } from 'react-router-dom';

export const SideBarPart = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navigate = useNavigate();
 

  const handleLogout = () => {
   try {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); 
    return toast.success('Logged out successfully');

   } catch (error) {
   return toast.error(error.message || "LogOut Failed");
   }
  };

  return (
    <>
      {/* Hamburger Menu for small screens */}
      <button
        className="lg:hidden p-4 z-50 top-0 left-0 h-fit"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-transform duration-300 ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        } lg:translate-x-0 lg:static`}
      >
        <Sidebar className="h-full   shadow-md">
          <Menu
            className="pt-10 h-full w-full  !bg-accent-foreground"
            menuItemStyles={{
              button: ({ active }) => ({
                color: active ? '#00be85' : '#94a3b8',
                backgroundColor: 'transparent',
                padding: '12px 16px',
                margin: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }),
            }}
          >
            <MenuItem
              component={<NavLink to="/" />}
              icon={<Home size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Home
            </MenuItem>

            <MenuItem
              component={<NavLink to="/profile" />}
              icon={<User size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Profile
            </MenuItem>

            <MenuItem
              component={<NavLink to="/question" />}
              icon={<FileQuestion size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Question
            </MenuItem>

            <MenuItem
              component={<NavLink to="/tags" />}
              icon={<Tag size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Tags
            </MenuItem>

            <MenuItem
              component={<NavLink to="/discussion" />}
              icon={<ChartBarIcon size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Discussion
            </MenuItem>

            <MenuItem
              component={<NavLink to="/chat" />}
              icon={<MessageCircle size={20} />}
              className="hover:bg-emerald-300 hover:text-black"
            >
              Chat
            </MenuItem>

            <MenuItem
              component={<NavLink to="/users" />}
              icon={<User size={20} />}
              className="hover:bg-emerald-100 hover:text-black"
            >
              Users
            </MenuItem>

            <MenuItem
             component={<NavLink to="/" />}
             icon={ <LogOut className="size-5" />}
             className="hover:bg-emerald-100 hover:text-black">
            <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
               
                Logout
              </button>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};
