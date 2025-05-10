import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/useAuth';
import { SideBarPart } from '../ui/SideBarPart';
import Navbar from '../Navbar';
import TopBar from '../TopBar';

const Home = () => {
  const { topQuestions, fetchTopQuestions, isLoadingQuestions } = useAuthStore();

  useEffect(() => {
    fetchTopQuestions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        <TopBar /> {/* Assuming you have a TopBar component */}
      </div>

      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 pt-20"> {/* pt-20 to account for fixed navbar height */}
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-16 lg:w-36 z-40">
          <SideBarPart />
        </div>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col items-center justify-center px-12  py-6 z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text mb-6">
              Welcome to StackWave
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              A vibrant developer hub where curiosity meets clarity. Share your ideas, ask questions, and connect with a passionate tech community.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/ask" className="btn btn-primary px-8 py-3 rounded-lg font-medium">
                Ask a Question
              </Link>
              <Link to="/question" className="btn btn-outline btn-accent px-8 py-3 rounded-lg font-medium">
                Explore Questions
              </Link>
            </div>
          </motion.div>

          {/* Top Questions Section */}
          <section className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                🔥 Top Questions
              </span>
            </h2>
            
            {isLoadingQuestions ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : topQuestions.length > 0 ? (
              <div className="grid gap-4">
                {topQuestions.map((q) => (
                  <motion.div
                    key={q._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-lg"
                  >
                    <Link
                      to={`/questions/${q._id}`}
                      className="block p-6 hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold mb-2 text-white">{q.title}</h3>
                      <p className="text-gray-400 mb-4">{q.body.slice(0, 120)}...</p>
                      <div className="flex flex-wrap gap-2">
                        {q.tags?.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">No questions available yet</div>
                <Link to="/ask" className="btn btn-primary btn-sm">
                  Be the first to ask!
                </Link>
              </div>
            )}
          </section>
        </main>
      </div>

  
    </div>
  );
};

export default Home;