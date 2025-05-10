import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuth";

const mockTagInfo = {
  javascript: {
    description: "For questions about programming in ECMAScript (JavaScript/JS)...",
    total: "2,537,654",
    today: 39,
    thisWeek: 324,
  },
  python: {
    description: "Python is a dynamically typed, multi-purpose programming language...",
    total: "2,222,986",
    today: 117,
    thisWeek: 610,
  },
  java: {
    description: "Java is a high-level object-oriented programming language...",
    total: "1,924,483",
    today: 50,
    thisWeek: 302,
  },
  react: {
    description: "React is a JavaScript library for building user interfaces...",
    total: "1,543,210",
    today: 89,
    thisWeek: 432,
  },
  nodejs: {
    description: "Node.js is an asynchronous event-driven JavaScript runtime...",
    total: "1,234,567",
    today: 42,
    thisWeek: 287,
  },
};

const Tag = () => {
  const { tags, isLoadingTags, tagError, getTags } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleTagClick = (tagName) => {
    navigate(`/tags/${tagName}`);
  };

  const filteredTags = Array.isArray(tags)
    ? tags.filter((tag) => {
        const tagName = typeof tag === "string" ? tag : tag?.name || "";
        return tagName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  if (isLoadingTags) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (tagError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading tags: {tagError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 min-h-screen  relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text">
            Explore Tags
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Tags help categorize questions and make them easier to find. Browse our collection of {tags?.length || 0}+ tags.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search tags (e.g. 'javascript', 'react')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tags Grid */}
        {filteredTags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTags.map((tag, index) => {
              const tagName = typeof tag === "string" ? tag : tag?.name || "unknown";
              const info = mockTagInfo[tagName] || {
                description: "No description available for this tag yet.",
                total: (Math.random() * 2000000).toLocaleString(),
                today: Math.floor(Math.random() * 50),
                thisWeek: Math.floor(Math.random() * 200),
              };

              return (
                <div
                  key={index}
                  onClick={() => handleTagClick(tagName)}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        #{tagName}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {info.description}
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-gray-700/50 rounded-lg p-2">
                        <div className="font-bold text-emerald-400">{info.today}</div>
                        <div className="text-gray-400 text-xs">today</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2">
                        <div className="font-bold text-cyan-400">{info.thisWeek}</div>
                        <div className="text-gray-400 text-xs">this week</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2">
                        <div className="font-bold text-purple-400">{info.total}</div>
                        <div className="text-gray-400 text-xs">total</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No tags found matching "{searchTerm}"</div>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white transition-colors duration-300"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;