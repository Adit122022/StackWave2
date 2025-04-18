import { axiosInstance } from "@/AXIOS/axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


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
    <div className=" w-full h-screen mx-auto px-20 py-12 relative z-20">
      <h2 className="text-2xl font-bold mb-6 text-white">Questions tagged with #{tagName}</h2>

      {questions.length > 0 ? (
        <ul className="space-y-4">
          {questions.map((q) => (
             <div className="space-y-4">
             <Card
             key={q._id}
             className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-gray-700 hover:bg-[#1f1f1f]/90 transition duration-300 shadow-md hover:shadow-lg"
           >
             <CardHeader>
               <CardTitle>
                 <Link
                   to={`/questions/${q._id}`}
                   className="text-white hover:underline font-bold uppercase"
                 >
                   {q.title}
                 </Link>
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-gray-300 line-clamp-2">{q.body}</p>
               <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                 <span className='flex justify-center items-center gap-2' >Asked by 
                
                   <h2 className='uppercase text-cyan-400'>{q.authorId?.name || 'Anonymous'}</h2>
                 </span>
                 <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                 <span>{q.answers?.length || 0} Answers</span>
               </div>
             </CardContent>
           </Card>
           </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No questions found for this tag.</p>
      )}
    </div>
  );
};

export default TagQuestions;
