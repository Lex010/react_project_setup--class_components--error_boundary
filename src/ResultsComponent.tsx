import React, { Component } from 'react';

interface Result {
  name: string;
  url: string;
}

interface PokemonData {
  name: string;
  height: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}

interface ResultsComponentProps {
  searchTerm: string;
}

interface ResultsComponentState {
  results: Result[];
  pokemonData?: PokemonData;
  loading: boolean;
  offset: number;
  error: boolean;
}

class ResultsComponent extends Component<
  ResultsComponentProps,
  ResultsComponentState
> {
  constructor(props: ResultsComponentProps) {
    super(props);
    this.state = {
      results: [],
      pokemonData: undefined,
      loading: false,
      offset: 0,
      error: false,
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
    this.setState({ loading: true, error: false });
    const { searchTerm } = this.props;
    const { offset } = this.state;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`;
    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      if (searchTerm) {
        const data = await response.json();
        this.setState({ pokemonData: data, loading: false });
      } else {
        const data = await response.json();
        // console.log(data.results.map((result: Result) => result.name));
        this.setState({
          results: data.results,
          loading: false,
          pokemonData: undefined,
        });
      }
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.error('Fetch error:', error);
    }
  };

  handlePrev = () => {
    this.setState(
      (prevState) => ({ offset: Math.max(0, prevState.offset - 10) }),
      this.fetchResults,
    );
  };

  handleNext = () => {
    this.setState(
      (prevState) => ({ offset: prevState.offset + 10 }),
      this.fetchResults,
    );
  };

  render() {
    const { results, pokemonData, loading, offset, error } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      throw new Error('Failed to fetch data');
    }
    return (
      <div>
        {pokemonData ? (
          <div>
            <h3>{pokemonData.name}</h3>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
            <p>Height: {pokemonData.height}</p>
            <p>Base experience: {pokemonData.base_experience}</p>
          </div>
        ) : (
          <div>
            {results.map((result, index) => (
              <div key={index}>
                <h3>{result.name}</h3>
              </div>
            ))}
            <div>
              <button onClick={this.handlePrev} disabled={offset === 0}>
                Previous
              </button>
              <button onClick={this.handleNext}>Next</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ResultsComponent;
