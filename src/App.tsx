import React from 'react';
import { useSelector } from 'react-redux';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import ErrorBoundary from './ErrorBoundary';
import { RootState } from './store/store';
import './style.css';

const App: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  return (
    <ErrorBoundary>
      <div className="app">
        <div className="search-section">
          <SearchComponent />
        </div>
        <div className="results-section">
          <ResultsComponent searchTerm={searchTerm} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
