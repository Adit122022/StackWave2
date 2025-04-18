import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Bubbles animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[400px] h-[400px] bg-emerald-400 opacity-20 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-0 right-0 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text mb-6">
          Welcome to StackWave
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          A vibrant developer hub where curiosity meets clarity. Share your ideas, ask questions, and connect with a passionate tech community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/ask" className='btn btn-primary'>
              Ask a Question
          </Link>
          <Link to="/question" className='btn btn-primary'>
              Explore Questions
          
          </Link>
        </div>
      </motion.div>

      {/* Floating icons or logos */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 text-sm text-muted text-center z-10"
      >
        Built with 💚 by StackWave Team
      </motion.div>
    </div>
  );
};

export default Home;
