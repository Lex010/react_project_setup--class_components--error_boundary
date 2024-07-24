import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemonApi';
import searchReducer from './slices/searchSlice';
import themeReducer from './slices/themeSlice';
import pageReducer, { PageState } from './slices/pageSlice';
import selectedItemsReducer, {
  SelectedItemsState,
} from './slices/selectedItemsSlice';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
    theme: themeReducer,
    page: pageReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { PageState, SelectedItemsState };

export default store;
