import { LogOut, User, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // Optional: Consider removing if navigate suffices
  };

  return (
    <nav className="bg-gray-800 text-white px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="font-bold text-xl tracking-tight">
          StackWave
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/ask" className="btn btn-ghost btn-sm hover:underline">
            Ask Question
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="btn btn-ghost btn-sm flex items-center gap-2">
                <User className="size-5" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm flex items-center gap-2"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm flex items-center gap-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-ghost btn-sm flex items-center gap-2">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden btn btn-ghost btn-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-700 rounded-lg p-4 space-y-2">
          <Link
            to="/ask"
            className="block btn btn-ghost btn-sm hover:underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ask Question
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className=" btn btn-ghost btn-sm flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="size-5" />
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className=" btn btn-ghost btn-sm flex items-center gap-2"
              >
                <LogOut className="size-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className=" btn btn-ghost btn-sm flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className=" btn btn-ghost btn-sm flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;