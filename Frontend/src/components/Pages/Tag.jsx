import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuth";

const Tag = () => {
  const { tags, isLoadingTags, tagError, getTags } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getTags(); // fetch tags on mount
  }, []);

  const handleTagClick = (tagName) => {
    navigate(`/tags/${tagName}`);
  };

  if (isLoadingTags) return <p>Loading tags...</p>;
  if (tagError) return <p className="text-red-500">Error: {tagError}</p>;

  return (
    <div className="flex justify-left items-start w-full min-h-screen relative z-20 py-12 px-20">
      <ul className="flex flex-wrap gap-3">
        {tags.length > 0 ? (
          tags.map((tag, i) => (
            <li
              key={i}
              onClick={() => handleTagClick(tag)}
              className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              #{tag}
            </li>
          ))
        ) : (
          <div className="skeleton bg-gray-500 h-6 w-32 rounded"></div>
        )}
      </ul>
    </div>
  );
};

export default Tag;
