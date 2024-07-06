import * as React from 'react';

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchComponentState {
  searchTerm: string;
}

class SearchComponent extends React.Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedSearchTerm };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value.trim() });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
