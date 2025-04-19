import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import useAuthStore from '@/store/useAuth';

const Home = () => {
  const { topQuestions, fetchTopQuestions, isLoadingQuestions } = useAuthStore();

  useEffect(() => {
    fetchTopQuestions();
  }, []);

  return (
    <div className=" text-white flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-emerald-400 opacity-20 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-0 right-0 animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow z-10 px-6 pt-10 pb-16 flex flex-col items-center gap-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text mb-6">
            Welcome to StackWave
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            A vibrant developer hub where curiosity meets clarity. Share your ideas, ask questions, and connect with a passionate tech community.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/ask" className="btn btn-primary">
              Ask a Question
            </Link>
            <Link to="/question" className="btn btn-outline btn-accent">
              Explore Questions
            </Link>
          </div>
        </motion.div>

        {/* Top Questions Section */}
        <section className="w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-white">🔥 Top Questions</h2>
          {isLoadingQuestions ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-dots loading-lg text-white" />
            </div>
          ) : topQuestions.length > 0 ? (
            <ul className="space-y-4">
              {topQuestions.map((q) => (
                <li key={q._id}>
                  <Link
                    to={`/questions/${q._id}`}
                    className="block bg-base-200 shadow p-4 rounded hover:bg-base-300 transition duration-200"
                  >
                    <h3 className="text-lg font-semibold">{q.title}</h3>
                    <p className="text-sm text-gray-400">{q.content.slice(0, 100)}...</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No questions available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
