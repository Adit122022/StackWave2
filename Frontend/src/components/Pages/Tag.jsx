import React, { useEffect } from "react";

import useAuthStore from "@/store/useAuth";

const Tag = () => {
  const { tags, isLoadingTags, tagError, getTags } = useAuthStore();
  console.log(tags)

  useEffect(() => {
    getTags(); // fetch tags on mount
  }, []);

  if (isLoadingTags) return <p>Loading tags...</p>;
  if (tagError) return <p className="text-red-500">Error: {tagError}</p>;

  return (
   <div className="flex justify-left items-top  w-full h-screen relative z-20 py-12 px-20">
     <ul className="space-y-1">
      {
        tags.length > 0  ? 
        (tags.map((tag, i) => (
            <li key={i} className="px-3 py-1 bg-gray-500 inline-block rounded">
              #{tag}
            </li>
          ))) : (
            <div className="skeleton bg-gray-500 h-6 w-32"></div>
          )
      }
    </ul>
   </div>
  );
};

export default Tag;
