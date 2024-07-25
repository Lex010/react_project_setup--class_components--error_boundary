import selectedItemsReducer, {
  addItem,
  removeItem,
  clearItems,
} from '../store/slices/selectedItemsSlice';
import { test, expect } from 'vitest';

test('should handle initial state', () => {
  expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
    selectedItems: [],
  });
});

test('should handle addItem', () => {
  const initialState = { selectedItems: [] };
  const actual = selectedItemsReducer(initialState, addItem('item1'));
  expect(actual.selectedItems).toEqual(['item1']);
});

test('should handle removeItem', () => {
  const initialState = { selectedItems: ['item1'] };
  const actual = selectedItemsReducer(initialState, removeItem('item1'));
  expect(actual.selectedItems).toEqual([]);
});

test('should handle clearItems', () => {
  const initialState = { selectedItems: ['item1', 'item2'] };
  const actual = selectedItemsReducer(initialState, clearItems());
  expect(actual.selectedItems).toEqual([]);
});
