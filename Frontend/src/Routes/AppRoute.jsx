import React from 'react'
import {BrowserRouter ,  Route, Routes , } from 'react-router-dom'
import Signup from '../Auth/Signup'
import QuestionDetail from '../components/Question/QuestionDetails';
import AskQuestion from '../components/Pages/AskQuestion';
import Login from '../Auth/Login';
import Home from '../components/Pages/Home';
import Profile from '../components/Pages/Profile';
import ProtectedRoute from '../Others/ProtectedRoute';
import Navbar from '../components/Navbar';
import { SideBarPart } from '@/components/ui/SideBarPart';
import TopBar from '@/components/TopBar';
import Particles from '@/components/ui/ReactBIt/Particles';
import Tag from '@/components/Pages/Tag';
import Reputation from '@/components/Pages/Reputation';

const AppRoute = () => {
  return (
  <BrowserRouter>
 <TopBar/>
      <Navbar/>
  <Routes>
    <Route path='/' element={  <>
     <div className="flex bg-accent-foreground  relative overflow-x-hidden">
     <SideBarPart className='bg-accent-foreground'/>
     <Home/> 
     <div className='w-screen h-full absolute top-0 left-0' >
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
     </div>
    </>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<ProtectedRoute>
      <div className="flex bg-accent-foreground  relative overflow-x-hidden">
     <SideBarPart className='bg-accent-foreground'/>
     <Profile/> 
     <div className='w-screen h-full absolute top-0 left-0' >
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
     </div>
       </ProtectedRoute>} />
    <Route path="/questions/:id" element={<ProtectedRoute>
      <div className="flex bg-accent-foreground  relative">
     <SideBarPart className='bg-accent-foreground'/>
     <QuestionDetail/> 
     <div className='w-screen h-full absolute top-0 left-0' >
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
     </div>
         </ProtectedRoute>} />
    <Route path="/ask" element={<ProtectedRoute> 
      <div className="flex bg-accent-foreground  relative ">
     <SideBarPart className='bg-accent-foreground'/>
     <AskQuestion/> 
     <div className='w-screen h-full absolute top-0 left-0' >
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
     </div>
       </ProtectedRoute>} />
    <Route path="/tags" element={<ProtectedRoute> 
      <div className="flex bg-accent-foreground  relative ">
     <SideBarPart className='bg-accent-foreground'/>
     <Tag/> 
     <div className='w-screen h-full absolute top-0 left-0' >
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
     </div>
       </ProtectedRoute>} />
  
  </Routes>
   </BrowserRouter>
  )
}

export default AppRoute