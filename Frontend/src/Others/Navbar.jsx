import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">StackWave</Link>
      <div className="space-x-4">
        <Link to="/ask" className="hover:underline">Ask Question</Link>
        {isLoggedIn ? (
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
