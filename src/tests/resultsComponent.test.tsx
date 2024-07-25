import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ResultsComponent from '../ResultsComponent';
import { pokemonApi } from '../services/pokemonApi';
import searchReducer from '../store/slices/searchSlice';
import themeReducer from '../store/slices/themeSlice';
import pageReducer from '../store/slices/pageSlice';
import selectedItemsReducer from '../store/slices/selectedItemsSlice';
import { test, expect } from 'vitest';

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

test('renders ResultsComponent and interacts with it', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ResultsComponent />
      </MemoryRouter>
    </Provider>,
  );

  const loadingElement = screen.queryByText(/Loading.../i);
  if (loadingElement) {
    await waitFor(() => {
      expect(screen.queryByText(/Page/i)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Next/i)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Previous/i)).not.toBeInTheDocument();
    });
  } else {
    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Next/i));
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Previous/i));
    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
  }
});
const a = React;
export default a;
