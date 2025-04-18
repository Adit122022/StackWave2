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
  // Add more mock descriptions here...
};

const Tag = () => {
  const { tags, isLoadingTags, tagError, getTags } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTags(); // fetch tags on mount
  }, []);

  const handleTagClick = (tagName) => {
    navigate(`/tags/${tagName}`);
  };

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingTags) return <p>Loading tags...</p>;
  if (tagError) return <p className="text-red-500">Error: {tagError}</p>;

  return (
    <div className="px-12 py-10 min-h-screen text-white relative z-10">
      <h1 className="text-3xl font-bold mb-2">Tags</h1>
      <p className="text-gray-200 w-1/2 mb-6">
        A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.
      </p>

      <input
        type="text"
        placeholder="🔍 Filter by tag name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag, index) => {
            const info = mockTagInfo[tag] || {
              description: "No description available for this tag yet.",
              total: "???",
              today: Math.floor(Math.random() * 50),
              thisWeek: Math.floor(Math.random() * 200),
            };

            return (
              <div
                key={index}
                onClick={() => handleTagClick(tag)}
                className="cursor-pointer border border-gray-300 rounded p-4 hover:shadow-md transition bg-gray-400"
              >
                <span className="bg-gray-600 text-sm font-semibold px-2 py-1 rounded inline-block mb-2">
                  #{tag}
                </span>
                <p className="text-gray-700 text-sm mb-3">
                  {info.description.length > 140
                    ? info.description.slice(0, 140) + "..."
                    : info.description}
                </p>
                <p className="text-xs text-gray-500">{info.total} questions</p>
                <p className="text-xs text-gray-500">
                  {info.today} asked today, {info.thisWeek} this week
                </p>
              </div>
            );
          })
        ) : (
          <p>No tags found.</p>
        )}
      </div>
    </div>
  );
};

export default Tag;
