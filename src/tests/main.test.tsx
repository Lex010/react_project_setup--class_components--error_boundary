import ReactDOM from 'react-dom/client';
import { render, act } from '@testing-library/react';
import { test } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store/store';

test('renders App component using createRoot', async () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  await act(async () => {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <Provider store={store}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Provider>
      </React.StrictMode>,
    );
  });
});

test('renders App component using testing-library', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );
  });
});
