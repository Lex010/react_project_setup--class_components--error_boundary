import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from './services/pokemonApi';
import { RootState } from './store/store';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsComponent: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: pokemonLoading,
    isFetching: pokemonFetching,
  } = useGetPokemonByNameQuery(searchTerm, { skip: !searchTerm });

  const {
    data: pokemonList,
    error: listError,
    isLoading: listLoading,
    isFetching: listFetching,
  } = useGetPokemonListQuery(
    { offset: (page - 1) * 10, limit: 10 },
    { skip: !!searchTerm },
  );

  const isLoading =
    pokemonLoading || listLoading || pokemonFetching || listFetching;

  const hasError = (pokemonError && searchTerm) || (listError && !searchTerm);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return (
      <div>
        We dont have such pokemon. LETTER CASE MATTERS. Clear the search bar and
        press search to display the list
      </div>
    );
  }

  return (
    <div>
      {searchTerm ? (
        pokemonData ? (
          <div>
            <h3>{pokemonData.name}</h3>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
            <p>Height: {pokemonData.height}</p>
            <p>Base experience: {pokemonData.base_experience}</p>
          </div>
        ) : null
      ) : (
        <div>
          {pokemonList?.results.map(
            (result: { name: string }, index: number) => (
              <div key={index}>
                <h3>{result.name}</h3>
              </div>
            ),
          )}
        </div>
      )}
      <div>
        <button
          onClick={() => navigate(`?page=${page - 1}`)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => navigate(`?page=${page + 1}`)}>Next</button>
      </div>
    </div>
  );
};

export default ResultsComponent;
