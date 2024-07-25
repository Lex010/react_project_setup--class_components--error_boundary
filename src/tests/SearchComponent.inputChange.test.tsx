import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import SearchComponent from '../SearchComponent';
import { test, expect } from 'vitest';

test('updates input value on change', () => {
  render(
    <Provider store={store}>
      <SearchComponent />
    </Provider>,
  );
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'new search term' } });
  expect(input).toHaveValue('new search term');
});
const a = React;
export default a;
