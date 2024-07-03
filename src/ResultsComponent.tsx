import React, { Component } from 'react';

interface Result {
  name: string;
  description: string;
}

interface ResultsComponentProps {
  searchTerm: string;
}

interface ResultsComponentState {
  results: Result[];
  loading: boolean;
}

class ResultsComponent extends Component<
  ResultsComponentProps,
  ResultsComponentState
> {
  constructor(props: ResultsComponentProps) {
    super(props);
    this.state = {
      results: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps: ResultsComponentProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchResults();
    }
  }

  fetchResults = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?search=${this.props.searchTerm}`,
    );
    const data = await response.json();
    this.setState({ results: data.results as Result[], loading: false });
  };

  render() {
    const { results, loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsComponent;
