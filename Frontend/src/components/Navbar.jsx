import { LogOut, User, Slack, MessageCircleQuestion, LogIn, Code, Home, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GradientText from './ui/ReactBIt/GradientText';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Mobile menu items component to avoid duplication
  const MobileMenuItems = () => (
    <>
      <Link
        to="/"
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-3 p-4 text-lg ${isActive('/') ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
      >
        <Home className="size-5" />
        <span>Home</span>
      </Link>

      <Link
        to="/ask"
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-3 p-4 text-lg ${isActive('/ask') ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
      >
        <MessageCircleQuestion className="size-5" />
        <span>Ask Question</span>
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            to="/collab"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-4 text-lg ${isActive('/collab') ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
          >
            <Code className="size-5" />
            <span>Collab</span>
          </Link>

          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-4 text-lg ${isActive('/profile') ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
          >
            <User className="size-5" />
            <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 text-lg text-red-400 hover:bg-red-500/10 w-full text-left"
          >
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <Link
          to="/login"
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 p-4 text-lg ${isActive('/login') ? 'bg-emerald-500/10 text-emerald-400' : 'text-white'}`}
        >
          <LogIn className="size-5" />
          <span>Login</span>
        </Link>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Slack className="text-emerald-400" />
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-xl font-bold"
            >
              StackWave
            </GradientText>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col py-4">
          <MobileMenuItems />
        </nav>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed w-full top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg' : 'bg-primary/80'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <Slack className="text-emerald-400 group-hover:rotate-12 transition-transform" />
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-xl sm:text-2xl font-bold"
              >
                StackWave
              </GradientText>
            </Link>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/') ? 'bg-emerald-400/20 text-emerald-400' : 'hover:bg-white/10'}`}
              >
                <Home className="size-4 sm:size-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link
                to="/ask"
                className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/ask') ? 'bg-emerald-400/20 text-emerald-400' : 'hover:bg-white/10'}`}
              >
                <MessageCircleQuestion className="size-4 sm:size-5" />
                <span className="hidden sm:inline">Ask</span>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/collab"
                    className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/collab') ? 'bg-emerald-400/20 text-emerald-400' : 'hover:bg-white/10'}`}
                  >
                    <Code className="size-4 sm:size-5" />
                    <span className="hidden sm:inline">Collab</span>
                  </Link>

                  <Link
                    to="/profile"
                    className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/profile') ? 'bg-emerald-400/20 text-emerald-400' : 'hover:bg-white/10'}`}
                  >
                    <User className="size-4 sm:size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg flex items-center gap-1 hover:bg-red-400/20 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="size-4 sm:size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`p-2 rounded-lg flex items-center gap-1 transition-colors ${isActive('/login') ? 'bg-emerald-400/20 text-emerald-400' : 'hover:bg-white/10'}`}
                >
                  <LogIn className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;