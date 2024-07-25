import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';
import { test, expect } from 'vitest';

test('renders NotFoundPage with correct message', () => {
  render(<NotFoundPage />);
  expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
});
