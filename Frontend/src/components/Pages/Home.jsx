import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Others/Navbar';
import SearchBar from '../../Others/SearchBar';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => {
        setQuestions(res.data);
        setFilteredQuestions(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);

    if (value.trim() === '') {
      setFilteredQuestions(questions);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
      setFilteredQuestions(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleSort = (type) => {
    const sorted = [...filteredQuestions];
    if (type === 'latest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'a-z') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'answers') {
      sorted.sort((a, b) => (b.answers?.length || 0) - (a.answers?.length || 0));
    }
    setFilteredQuestions(sorted);
  };

  return (
    <div>
      <div className="w-screen h-16 bg-white shadow-md">
        <Navbar />
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">All Questions</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <SearchBar value={search} onSearch={handleSearch} />
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="latest">Sort by Latest</option>
              <option value="a-z">Sort A-Z</option>
              <option value="answers">Sort by Answers</option>
            </select>
            <Link
              to="/ask"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
            >
              Ask Question
            </Link>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{filteredQuestions.length} questions found</p>

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <p className="text-center text-gray-500">No questions found.</p>
          ) : (
            filteredQuestions.map((q) => (
              <Link
                to={`/questions/${q._id}`}
                key={q._id}
                className="block p-4 bg-white shadow rounded hover:bg-blue-50 transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.body}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Asked by {q.author?.username || 'Anonymous'}</span>
                  <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  <span>{q.answers?.length || 0} Answers</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
