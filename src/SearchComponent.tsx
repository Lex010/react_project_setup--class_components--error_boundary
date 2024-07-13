import React, { useState } from 'react';

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || '',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSearch = () => {
    localStorage.setItem('searchTerm', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
