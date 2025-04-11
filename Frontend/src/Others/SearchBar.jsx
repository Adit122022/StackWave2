import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 500);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedInput.trim()) {
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:5000/api/search?q=${debouncedInput}`);
          setResults(res.data);
        } catch (err) {
          console.error('Search error:', err);
          setLoading(false);
        } 
        
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedInput]);

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search questions..."
        className="w-full p-2 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {input && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-10 max-h-60 overflow-y-auto mt-1 rounded">
          {loading ? (
            <p className="p-3 text-center text-sm text-blue-500">Searching...</p>
          ) : results.length === 0 ? (
            <p className="p-3 text-center text-sm text-gray-500">No matching questions.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {results.map((item) => (
                <li key={item._id} className="hover:bg-gray-50 transition">
                  <Link
                    to={`/questions/${item._id}`}
                    className="block px-4 py-2"
                  >
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
