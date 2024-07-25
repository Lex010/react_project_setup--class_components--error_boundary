import searchReducer, { setSearchTerm } from '../store/slices/searchSlice';
import { test, expect } from 'vitest';

test('should handle initial state', () => {
  expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
    searchTerm: '',
  });
});

test('should handle setSearchTerm', () => {
  const initialState = { searchTerm: '' };
  const actual = searchReducer(initialState, setSearchTerm('pikachu'));
  expect(actual.searchTerm).toEqual('pikachu');
});
