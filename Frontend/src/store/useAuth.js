import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { axiosInstance } from '../AXIOS/axios';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      token: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: false,
      error: null,

      // Check if user is authenticated
      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axiosInstance.get('/auth/check');
          set({ authUser: response.data.user, token: response.data.token || get().token });
          return true;
        } catch (error) {
          set({ authUser: null, token: null, error: error.response?.data?.message || 'Authentication failed' });
          return false;
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // Sign up a new user
      signup: async (data) => {
        set({ isSigningUp: true, error: null });
        try {
          const response = await axiosInstance.post('/auth/signup', data);
          const { user, token } = response.data;
          console.log(response.data)
          set({ authUser: user, token, isSigningUp: false });
          localStorage.setItem('token', token); // Sync with localStorage
          toast.success('Account created successfully');
          return user;
        } catch (error) {
          const message = error.response?.data?.message || 'Signup failed';
          set({ error: message, isSigningUp: false });
         return toast.error(message);
          
        }
      },

      // Log in a user
      login: async (data) => {
        set({ isLoggingIn: true, error: null });
        try {
          const response = await axiosInstance.post('/auth/login', data);
          const { user, token } = response.data;
          set({ authUser: user, token, isLoggingIn: false });
          localStorage.setItem('token', token); // Sync with localStorage
          toast.success('Logged in successfully');
          return user;
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, isLoggingIn: false });
          toast.error(message);
          
        }
      },

     
   // Update user profile
      updateProfile: async (data) => {
        set({ isUpdatingProfile: true, error: null });
        try {
          const response = await axiosInstance.put('/auth/update-profile', data);
          set({ authUser: response.data.user, isUpdatingProfile: false });
          toast.success('Profile updated successfully');
          return response.data.user;
        } catch (error) {
          const message = error.response?.data?.message || 'Profile update failed';
          set({ error: message, isUpdatingProfile: false });
          toast.error(message);
          throw error;
        }
      },
      // Reset error state
      resetError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ authUser: state.authUser, token: state.token }), // Persist only user and token
    }
  )
);

export default useAuthStore;