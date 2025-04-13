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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <SearchBar value={query} onSearch={handleSearch} />
          <Select onValueChange={handleSort} defaultValue="latest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Sort by Latest</SelectItem>
              <SelectItem value="a-z">Sort A-Z</SelectItem>
              <SelectItem value="answers">Sort by Answers</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link to="/ask">Ask Question</Link>
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-destructive text-sm mb-4">{error}</p>
      )}

      <p className="text-muted-foreground mb-4">
        {filteredQuestions.length} questions found
      </p>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <p className="text-center text-muted-foreground">No questions found.</p>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <Card key={q._id} className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>
                  <Link to={`/questions/${q._id}`} className="text-primary hover:underline">
                    {q.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{q.body}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>Asked by {q.author?.username || 'Anonymous'}</span>
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