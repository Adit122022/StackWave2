import React from 'react'
import AppRoute from './components/Routes/AppRoute'

import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className='w-screen h-screen overflow-auto'>
     <AppRoute/>
   
     </div>
  )
}

export default App