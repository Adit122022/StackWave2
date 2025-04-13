import { create } from 'zustand';
import { axiosInstance } from '../AXIOS/axios';
import toast from 'react-hot-toast';

const useSearchStore = create((set, get) => ({
  questions: [],
  filteredQuestions: [],
  query: '',
  total: 0,
  from: 0,
  size: 10,
  isLoading: false,
  isSearching: false,
  error: null,

  fetchQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/questions');
      const questions = response.data;
      set({ questions, filteredQuestions: questions, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load questions';
      set({ error: message, isLoading: false });
      toast.error(message);
    }
  },

  search: async (query, from = 0, size = 10) => {
    set({ query, isSearching: true, error: null });
    if (!query.trim()) {
      set({
        filteredQuestions: get().questions,
        total: get().questions.length,
        from: 0,
        isSearching: false,
      });
      return;
    }

    try {
      const response = await axiosInstance.get('/search', {
        params: { q: query.trim(), from, size },
      });
      set({
        filteredQuestions: response.data.results || response.data,
        total: response.data.total || response.data.length,
        from,
        size,
        isSearching: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Search failed';
      set({ error: message, isSearching: false });
      toast.error(message);
    }
  },

  sortQuestions: (type) => {
    const sorted = [...get().filteredQuestions];
    if (type === 'latest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'a-z') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'answers') {
      sorted.sort((a, b) => (b.answers?.length || 0) - (a.answers?.length || 0));
    }
    set({ filteredQuestions: sorted });
  },

  changePage: (newFrom) => {
    if (newFrom >= 0 && newFrom < get().total) {
      get().search(get().query, newFrom, get().size);
    }
  },

  reset: () => set({ query: '', filteredQuestions: get().questions, total: get().questions.length, from: 0, error: null }),
}));

export default useSearchStore;