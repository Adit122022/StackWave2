import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = ({ value, onSearch }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search questions..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  );
};

export default SearchBar;