import { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';

import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import AuthImagePattern from '../Others/AuthImagesPattern';
import useAuthStore from '@/store/useAuth';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { signup , isSigningUp , error , resetError   } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit  = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return setLocalError('All fields are required');
    }
    if (!validateEmail(formData.email)) {
      return setLocalError('Please enter a valid email address'); 
    }
 
    try {
await signup(formData)
      navigate('/');
    } catch (err) {
      console.error(err);
    } 
    
  };
  if(localError)  toast.error(localError)

  return <div className="min-h-screen grid lg:grid-cols-2">
  {/* left side */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* LOGO */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div
            className="size-12 rounded-xl bg-accent/10 flex items-center justify-center 
          group-hover:bg-primary/20 transition-colors"
          >
            <MessageSquare className="size-6 text-accent" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Sign Up</h1>
          <p className="text-base-content/60">Get started with your free account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="email"
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full sm:w-full pl-10 pr-4 border border-gray-300 rounded-lg
             px-3 py-2 text-sm sm:text-base
             focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
         
         
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
{/*  Already have an account? */}
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>

  {/* right side */}

  <AuthImagePattern
    title="Welcome to DevHub"
    subtitle="Share your ideas, connect with people, and grow your network in a space made for developers and creators."
  />
</div>
};

export default Signup;
