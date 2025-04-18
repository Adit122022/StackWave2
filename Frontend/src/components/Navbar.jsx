import { LogOut, User, Menu, Slack, MessageCircleQuestion, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GradientText from './ui/ReactBIt/GradientText';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-primary/80 text-white px-4 sm:px-6 py-2 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/setings" className="font-bold text-2xl tracking-tight flex items-center gap-3">
          <Slack className="text-emerald-400"  />
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
          >
            StackWave
          </GradientText>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-2">
          <Link
            to="/ask"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost gap-2"
          >
            <MessageCircleQuestion className="size-5" />
            <span className="hidden sm:inline">Ask Question</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost gap-2"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost gap-2"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-ghost gap-2"
            >
              <LogIn />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
