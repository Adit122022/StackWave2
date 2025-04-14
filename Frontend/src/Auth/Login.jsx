import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import useAuthStore from '../store/useAuth';
import AuthImagePattern from '../Others/AuthImagesPattern';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');

  const validateForm = () => {
  
    if (!formData.email.trim()) return toast.error("Email is required");
  
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
  
    if (!formData.password) return toast.error("Password is required");
  
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
  
    return true; // ✅ All checks passed
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  const success=  validateForm()
  if(success === true)  login(formData); 
  navigate("/")
}

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-top items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-accent/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
              >
                <Mail className="size-6 text-accent" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Log In</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
           <form onSubmit={handleSubmit} className="space-y-6">
                {(error || localError) && <p className="text-red-500 text-sm text-center">{error}</p>}
          
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email </span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
                       px-3 py-2 text-sm sm:text-base
                       focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
                       placeholder="you@example.com"
                       value={formData.email}
                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                       disabled={isLoggingIn}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40" />
                      </div>
                      <input
                        className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
                       px-3 py-2 text-sm sm:text-base
                       focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
                       type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoggingIn}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5 text-base-content/40" />
                        ) : (
                          <Eye className="size-5 text-base-content/40" />
                        )}
                      </button>
                    </div>
                  </div>
          
                  <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                   
                   
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

          {/* Signup link */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Welcome to DevHub"
        subtitle="Share your ideas, connect with people, and grow your network in a space made for developers and creators."
      />
    </div>
  );
};

export default Login;