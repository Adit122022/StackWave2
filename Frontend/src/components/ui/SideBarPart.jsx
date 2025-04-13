import {
    ChartBarIcon,
    FileQuestion,
    Home,
    MessageCircle,
    Tag,
    User,
  } from 'lucide-react';
  import React from 'react';
  import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
  import { NavLink } from 'react-router-dom';
  
  export const SideBarPart = () => {
    return (
     
        <Sidebar className="h-screen  shadow-md">
          <Menu className='pt-10  h-full !bg-accent-foreground hover:bg-accent-content hover:text-black'
            menuItemStyles={{
              button: ({ active }) => ({
              
                color: active ? '#000' : '#94a3b8',
                padding: '12px 16px',
                borderRadius: '8px',
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
            >
              Home
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/profile" />}
              icon={<User size={20} />}
            >
              Profile
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/question" />}
              icon={<FileQuestion size={20} />}
            >
              Question
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/tags" />}
              icon={<Tag size={20} />}
            >
              Tags
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/discussion" />}
              icon={<ChartBarIcon size={20} />}
            >
              Discussion
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/chat" />}
              icon={<MessageCircle size={20} />}
            >
              Chat
            </MenuItem>
  
            <MenuItem
              component={<NavLink to="/users" />}
              icon={<User size={20} />}
            >
              Users
            </MenuItem>
          </Menu>
        </Sidebar>
    );
  };
  