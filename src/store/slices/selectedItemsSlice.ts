import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedItems: string[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item !== action.payload,
      );
    },
    clearItems(state) {
      state.selectedItems = [];
    },
    setItems(state, action: PayloadAction<string[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const { addItem, removeItem, clearItems, setItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
