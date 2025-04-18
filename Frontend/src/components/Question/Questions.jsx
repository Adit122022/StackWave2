import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../ui/select';
import { Loader2 } from 'lucide-react';
import SearchBar from '@/Others/SearchBar';
import useSearchStore from '@/store/useSearch';

const Questions = () => {
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

  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSearch = (value) => {
    search(value, 0, size);
  };

  const handleSort = (type) => {
    sortQuestions(type);
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const displayedQuestions = filteredQuestions?.filter((q) =>
    selectedTag === 'all' || q.tags?.includes(selectedTag)
  ) || [];

  const allTags = [...new Set(questions.flatMap((q) => q.tags || []))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 h-full relative">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-center sm:text-left ">
          Explore Questions
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Select onValueChange={handleSort} defaultValue="latest">
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 text-white border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white z-[99]">
              <SelectItem value="latest">Sort by Latest</SelectItem>
              <SelectItem value="a-z">Sort A-Z</SelectItem>
              <SelectItem value="answers">Sort by Answers</SelectItem>
            </SelectContent>
          </Select>

          <Button asChild variant="default" className="text-white">
            <Link to="/ask">Ask Question</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Button size="sm" variant={selectedTag === 'all' ? 'default' : 'outline'} onClick={() => handleTagFilter('all')}>
          All Tags
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant={selectedTag === tag ? 'default' : 'outline'}
            onClick={() => handleTagFilter(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <p className="text-sm text-muted-foreground mb-4">
        {displayedQuestions.length} questions found
      </p>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-8 animate-spin text-emerald-400" />
        </div>
      ) : displayedQuestions.length === 0 ? (
        <p className="text-center text-muted-foreground">No questions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedQuestions.slice(0, size).map((q) => (
            <Card
              key={q._id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-md hover:shadow-lg transition duration-300"
            >
              <CardHeader>
                <CardTitle>
                  <Link
                    to={`/questions/${q._id}`}
                    className="text-white hover:underline text-lg font-semibold"
                  >
                    {q.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 line-clamp-2 text-sm">{q.body}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-400 flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <span>Asked by</span>
                    <h2 className="text-cyan-400 font-semibold">
                      {q.authorId?.name || 'Anonymous'}
                    </h2>
                  </div>
                  <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  <span>{q.answers?.length || 0} Answers</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* DaisyUI Pagination */}
      {total > size && (
        <div className="mt-10 flex justify-center">
          <div className="join">
            <Button
              className="join-item"
              onClick={() => changePage(from - size)}
              disabled={from === 0 || isSearching}
            >
              Previous
            </Button>
            {Array.from({ length: Math.ceil(total / size) }).map((_, index) => (
              <Button
                key={index}
                className={`join-item ${from / size === index ? 'btn-active' : ''}`}
                onClick={() => changePage(index * size)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              className="join-item"
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

export default Questions;
