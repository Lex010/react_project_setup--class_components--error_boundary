import React from 'react';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import ErrorBoundary from './ErrorBoundary';
import useLocalStorage from './useLocalStorage';
import './style.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="search-section">
          <SearchComponent onSearch={handleSearch} />
        </div>
        <div className="results-section">
          <ResultsComponent searchTerm={searchTerm} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
