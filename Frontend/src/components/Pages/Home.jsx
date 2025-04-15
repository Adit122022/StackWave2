import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Loader2 } from 'lucide-react';
import SearchBar from '@/Others/SearchBar';
import useSearchStore from '@/store/useSearch';


const Home = () => {
  const {
    questions,
    filteredQuestions,
    query,
    total,
    from,
    size,
    isLoading,
    isSearching,
    error,
    fetchQuestions,
    search,
    sortQuestions,
    changePage,
  } = useSearchStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSearch = (value) => {
    search(value, 0, size); // Reset to first page
  };

  const handleSort = (type) => {
    sortQuestions(type);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto overflow-y-auto w-full z-[98] h-screen  relative">
        <h1 className="text-2xl font-bold mb-5 text-center">All Questions</h1>
      <div className="md:flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className='w-1/2 flex gap-5'>
          <Select onValueChange={handleSort} defaultValue="latest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-400  relative z-[99]">
              <SelectItem value="latest">Sort by Latest</SelectItem>
              <SelectItem value="a-z">Sort A-Z</SelectItem>
              <SelectItem value="answers">Sort by Answers</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link className='px-5 py-2 border  text-sm' to="/ask">Ask Question</Link>
          </Button>
          </div>
        </div>
      </div>

     <div className='md:flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
     {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

     <p className="text-muted-foreground mb-4">
        {filteredQuestions.length} questions found
      </p>
     </div>
    

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <p className="text-center text-muted-foreground">No questions found.</p>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
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
        
        
          ))}
        </div>
      )}

      {total > size && (
        <div className="mt-6 flex justify-center">
          <div className="inline-flex gap-2">
            <Button
              variant="outline"
              onClick={() => changePage(from - size)}
              disabled={from === 0 || isSearching}
            >
              Previous
            </Button>
            <span className="flex items-center text-sm text-muted-foreground">
              Page {Math.floor(from / size) + 1} of {Math.ceil(total / size)}
            </span>
            <Button
              variant="outline"
              onClick={() => changePage(from + size)}
              disabled={from + size >= total || isSearching}
            >
              Next
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;