import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !body || !tags) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/questions',
        {
          title,
          body,
          tags: tags.split(',').map(t => t.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      navigate('/')
      // navigate(`/questions/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to submit question. Please try again.');
    }
  };

  return (
    <div className="w-full mx-auto p-6 pt-5 pb-20 bg-gray-800/50 relative z-10 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Ask a public question</h1>

      <form onSubmit={handleSubmit} className="space-y-6 my-20">
        {error && <div className="text-red-600">{error}</div>}

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">
            Title <span className="text-red-600">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-1">
            Be specific and imagine you're asking a question to another person.
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Body */}
        <div>
          <label className="block font-semibold mb-1">
            Body <span className="text-red-600">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-">
            Include all the information someone would need to answer your question
          </p>
          <textarea
            className="w-full border border-gray-300 p-3 rounded min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe your problem in detail..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
         
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1">
            Tags <span className="text-red-600">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-1">
            Add up to 5 tags to describe what your question is about.
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. react, css, node.js"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Your Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
