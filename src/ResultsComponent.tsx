import React, { useState, useEffect } from 'react';

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

const ResultsComponent: React.FC<ResultsComponentProps> = ({ searchTerm }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchResults();
  }, [searchTerm, offset]);

  const fetchResults = async () => {
    setLoading(true);
    setError(false);
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`;
    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (searchTerm) {
        setPokemonData(data);
      } else {
        setResults(data.results);
        setPokemonData(undefined);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Fetch error:', error);
    }
  };

  const handlePrev = () => {
    setOffset(Math.max(0, offset - 10));
  };

  const handleNext = () => {
    setOffset(offset + 10);
  };

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
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
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
            <button onClick={handlePrev} disabled={offset === 0}>
              Previous
            </button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
