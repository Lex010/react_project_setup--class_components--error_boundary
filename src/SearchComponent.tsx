import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setSearchTerm } from './store/slices/searchSlice';

const SearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value.trim());
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(localSearchTerm));
  };

  return (
    <div>
      <input type="text" value={localSearchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
