import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from './services/pokemonApi';
import { RootState } from './store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPage } from './store/slices/pageSlice';
import {
  setItems,
  addItem,
  removeItem,
  clearItems,
} from './store/slices/selectedItemsSlice';
import { downloadSelectedItems } from './utils/downloadUtils';

const ResultsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);

  useEffect(() => {
    dispatch(setPage(page));
  }, [dispatch, page]);

  useEffect(() => {
    const itemsFromUrl = params.get('selectedItems');
    if (itemsFromUrl) {
      const items = itemsFromUrl.split(',');
      dispatch(setItems(items));
    }
  }, [location.search, dispatch]);

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
    { offset: (currentPage - 1) * 10, limit: 10 },
    { skip: !!searchTerm },
  );

  const isLoading =
    pokemonLoading || listLoading || pokemonFetching || listFetching;
  const hasError = (pokemonError && searchTerm) || (listError && !searchTerm);

  const handleSelectItem = (name: string) => {
    if (selectedItems.includes(name)) {
      dispatch(removeItem(name));
    } else {
      dispatch(addItem(name));
    }
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((i) => i !== name)
      : [...selectedItems, name];
    params.set('selectedItems', newSelectedItems.join(','));
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleClearItems = () => {
    dispatch(clearItems());
    params.delete('selectedItems');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleDownload = () => {
    const data = selectedItems.map((item) => ({
      name: item,
      description: `Description of ${item}`,
      detailsUrl: `https://pokeapi.co/api/v2/${item}`,
    }));
    downloadSelectedItems(data);
  };

  const handlePageChange = (newPage: number) => {
    params.set('page', newPage.toString());
    params.set('selectedItems', selectedItems.join(','));
    navigate(`${location.pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return (
      <div>
        We dont have such pokemon. LETTER CASE MATTERS. Clear the search bar and
        press search to display the list.
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
                <button onClick={() => handleSelectItem(result.name)}>
                  {selectedItems.includes(result.name) ? 'Unselect' : 'Select'}
                </button>
              </div>
            ),
          )}
        </div>
      )}
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
      {selectedItems.length > 0 && (
        <div className="unselectAll-download-container">
          <button onClick={handleClearItems} className="unselect-all-btn">
            Unselect All
          </button>
          <p>{selectedItems.length} items selected</p>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
