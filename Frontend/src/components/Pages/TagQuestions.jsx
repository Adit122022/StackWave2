import { axiosInstance } from "@/AXIOS/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const TagQuestions = () => {
  const { tagName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaggedQuestions = async () => {
      try {
        const res = await axiosInstance.get(`/tags/${tagName}`);
        setQuestions(res.data.questions || []);
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaggedQuestions();
  }, [tagName]);

  if (loading) return <p className="text-white p-4">Loading questions...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 relative z-20">
      <h2 className="text-2xl font-bold mb-6 text-white">Questions tagged with #{tagName}</h2>

      {questions.length > 0 ? (
        <ul className="space-y-4">
          {questions.map((question) => (
            <li
              key={question._id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition"
            >
              <h3 className="text-lg text-white font-semibold">{question.title}</h3>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">{question.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No questions found for this tag.</p>
      )}
    </div>
  );
};

export default TagQuestions;
