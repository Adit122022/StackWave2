import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import useAuthStore from '@/store/useAuth';



const QuestionDetail = () => {

  const {answerQuestion ,questionOne } = useAuthStore()
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(false);

//    console.log(question)

  const fetchQuestion = async () => {
    try {
      const data = await questionOne(id);
      setQuestion(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
  
    try {
      setLoading(true);
      
      await answerQuestion(newAnswer, id);
      setNewAnswer('');
      fetchQuestion(); // refresh answers
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const vote = async (answerId, type) => {
    try {
         console.log(answerId, type)
      const res = await axios.post(
        `http://localhost:5000/api/answers/${answerId}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchQuestion(); 
    } catch (err) {
      console.error(err);
    }
  };
  

  if (!question) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen overflow-y-auto">
    <div className="w-full flex justify-center px-4  pt-4 pb-40 overflow-x-hidden relative z-30">
      <div className="w-full max-w-3xl text-gray-400 shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold">{question.title}</h1>
        <p className="mt-2 text-gray-400 whitespace-pre-line">{question.body}</p>
  
        <h2 className="mt-8 text-2xl font-semibold text-gray-400">Answers</h2>
  
        {question.answers.map((ans) => (
          <div key={ans._id} className="border rounded-lg p-4 my-4 shadow-sm bg-gray-100/20">
            <p className="text-gray-200">{ans.content}</p>
  
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => vote(ans._id, 'up')}
                className="flex items-center gap-1 px-3 py-1 bg-green-500/50 hover:bg-green-600 text-white rounded"
              >
                <ThumbsUp size={18} /> Upvote
              </button>
  
              <span className="text-sm font-medium text-gray-200">{ans.votes || 0} votes</span>
  
              <button
                onClick={() => vote(ans._id, 'down')}
                className="flex items-center gap-1 px-3 py-1 bg-red-500/50 hover:bg-red-600 text-white rounded"
              >
                <ThumbsDown size={18} /> Downvote
              </button>
            </div>
  
            <span className="block mt-2 text-xs text-gray-500">
              by {ans.authorId?.name || 'Anonymous'}
            </span>
          </div>
        ))}
  
        {/* Answer Form */}
        <form onSubmit={handleAnswerSubmit} className="mt-8">
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your answer here..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            {loading ? 'Submitting...' : 'Submit Answer'}
          </button>
        </form>
      </div>
    </div>
  </div>
  
  
  ); 
};

export default QuestionDetail;
