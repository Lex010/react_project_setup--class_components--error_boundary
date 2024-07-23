import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import ErrorBoundary from './ErrorBoundary';
import { RootState } from './store/store';
import { toggleTheme } from './store/slices/themeSlice';
import './style.css';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <div className={`search-section ${theme}`}>
          <button onClick={handleThemeToggle} className="theme-toggle-btn">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <SearchComponent />
        </div>
        <div className="results-section">
          <ResultsComponent />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
