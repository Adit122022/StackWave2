
import React from 'react'
import { Link } from 'react-router-dom'

const Foooter = () => {
  return (
    <div>
         {/* Footer */}
     <footer className="w-full  bg-base-200 py-6 text-center text-sm text-gray-400 z-10">
     <p>
       Made with 💚 by the <span className="font-bold text-white">StackWave</span> Team | &copy; {new Date().getFullYear()}
     </p>
     <div className="mt-2 flex justify-center gap-4 text-xs">
       <Link to="/about" className="hover:underline">About</Link>
       <Link to="/contact" className="hover:underline">Contact</Link>
       <Link to="/privacy" className="hover:underline">Privacy</Link>
     </div>
   </footer>
    </div>
  )
}

export default Foooter