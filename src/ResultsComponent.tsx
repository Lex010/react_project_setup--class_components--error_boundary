import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);

  useEffect(() => {
    fetchResults();
  }, [searchTerm, page]);

  const fetchResults = async () => {
    setLoading(true);
    setError(false);
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 10}&limit=10`;
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
    navigate(`?page=${page - 1}`);
  };

  const handleNext = () => {
    navigate(`?page=${page + 1}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        We dont have such pokemon. LETTER CASE MATTERS. Clear the search bar and
        press search to display the list
      </div>
    );
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
        </div>
      )}
      <div>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ResultsComponent;
