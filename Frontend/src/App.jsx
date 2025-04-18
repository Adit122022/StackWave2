import React from 'react'
import AppRoute from './Routes/AppRoute'
import Navbar from './components/Navbar'
import { useThemeStore } from './store/useThemeStore';
import Foooter from './components/Foooter';

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className='w-screen h-screen overflow-auto'>
     <AppRoute/>
   
     </div>
  )
}

export default App