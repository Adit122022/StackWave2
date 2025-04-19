import useAuthStore from "@/store/useAuth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  // Add more mock descriptions here...
};

const Tag = () => {
  const { tags, isLoadingTags, tagError, getTags } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();




  const handleTagClick = (tagName) => {
    navigate(`/tags/${tagName}`);
  };

  // If tags are objects, use .name. If tags are strings, this is not necessary
  const filteredTags = Array.isArray(tags)
    ? tags.filter((tag) =>
        typeof tag === "string"
          ? tag.toLowerCase().includes(searchTerm.toLowerCase())
          : tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoadingTags) return <p className="text-center text-gray-400">Loading tags...</p>;
  if (tagError) return <p className="text-center text-red-500">Error: {tagError}</p>;

  return (
    <div className="px-12 py-10 min-h-screen text-white  relative z-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Tags</h1>
      <p className="text-gray-300 w-1/2 mx-auto mb-6 text-center">
        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
      </p>

      <input
        type="text"
        placeholder="🔍 Filter by tag name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full max-w-md mx-auto focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag, index) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            const info = mockTagInfo[tagName] || {
              description: "No description available for this tag yet.",
              total: "???",
              today: Math.floor(Math.random() * 50),
              thisWeek: Math.floor(Math.random() * 200),
            };

            return (
              <div
                key={index}
                onClick={() => handleTagClick(tagName)}
                className="cursor-pointer border border-gray-300 rounded-lg p-6 hover:bg-gray-600 hover:shadow-lg transition-all duration-300"
              >
                <span className="bg-gray-600 text-sm font-semibold px-2 py-1 rounded inline-block mb-2">
                  #{tagName}
                </span>
                <p className="text-gray-200 text-sm mb-3">
                  {info.description.length > 140
                    ? info.description.slice(0, 140) + "..."
                    : info.description}
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>{info.total} questions</p>
                  <p>{info.today} asked today, {info.thisWeek} this week</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400">No tags found.</p>
        )}
      </div>
    </div>
  );
};

export default Tag;
