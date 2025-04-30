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
  // Add more tags if needed
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
    return <p className="text-center text-gray-400">Loading tags...</p>;
  }

  if (tagError) {
    return <p className="text-center text-red-500">Error: {tagError}</p>;
  }

  return (
    <div className="px-12 py-10 min-h-screen text-white relative z-10">
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
            const tagName = typeof tag === "string" ? tag : tag?.name || "unknown";
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
               className="card bg-neutral text-neutral-content w-96">
              <div className="card-body items-center text-center">
                <h2 className="card-title"> #{tagName}</h2>
                <p>   {info.description.length > 140
                                  ? info.description + "..."
                                  : info.description}</p>
              
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
