import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemonApi';
import searchReducer from './slices/searchSlice';
import themeReducer from './slices/themeSlice';
import pageReducer from './slices/pageSlice'; // Добавьте этот импорт, если у вас есть pageSlice
import selectedItemsReducer from './slices/selectedItemsSlice';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    search: searchReducer,
    theme: themeReducer,
    page: pageReducer, // Добавьте этот редьюсер, если у вас есть pageSlice
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
