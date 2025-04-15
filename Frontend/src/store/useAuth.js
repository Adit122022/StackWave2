import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { axiosInstance } from '../AXIOS/axios';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      token: null,
      user: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: false,
      isLoadingUser: false,
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
          set({ authUser: user, token, isSigningUp: false });
          localStorage.setItem('token', token);
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
          localStorage.setItem('token', token);
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
          const response = await axiosInstance.put('/users/profile', data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
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
      
      // Submit an answer to a question
      answerQuestion: async (answerText, questionId) => {
        try {
          const response = await axiosInstance.post(
            `/answers/${questionId}`,
            { content: answerText },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          toast.success('Answer submitted successfully');
          return response.data;
        } catch (error) {
          const message = error.response?.data?.message || 'Failed to submit answer';
          toast.error(message);
          throw error;
        }
      },

      // Fetch one question
      questionOne: async (id) => {
        try {
          const res = await axiosInstance.get(`/questions/${id}`);
          return res.data;
        } catch (err) {
          console.error("Failed to fetch question:", err);
          throw err;
        }
      },

      // Fetch user profile
      fetchUserStore: async () => {
        set({ isLoadingUser: true, error: null });
        try {
          const res = await axiosInstance.get('/users/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set({ user: res.data, isLoadingUser: false });
          return res.data;
        } catch (err) {
          console.error(err);
          set({ error: 'Failed to fetch user data', isLoadingUser: false });
        }
      },
    }),
  
  )
);

export default useAuthStore;
