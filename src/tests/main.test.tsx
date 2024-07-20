import ReactDOM from 'react-dom/client';
import { render } from '@testing-library/react';
import { test } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders App component using createRoot', async () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </React.StrictMode>,
  );
});

test('renders App component using testing-library', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
});
