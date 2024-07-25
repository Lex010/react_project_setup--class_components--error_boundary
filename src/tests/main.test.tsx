import ReactDOM from 'react-dom/client';
import { render, act } from '@testing-library/react';
import { test } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders App component using createRoot', async () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  await act(async () => {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </React.StrictMode>,
    );
  });
});

test('renders App component using testing-library', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
});
