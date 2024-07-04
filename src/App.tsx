import React, { Component } from 'react';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import ErrorBoundary from './ErrorBoundary';
import './style.css';

interface AppState {
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedSearchTerm };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <div className="search-section">
            <SearchComponent onSearch={this.handleSearch} />
          </div>
          <div className="results-section">
            <ResultsComponent searchTerm={this.state.searchTerm} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
