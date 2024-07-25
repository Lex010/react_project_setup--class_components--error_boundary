import React from 'react';
import { render } from '@testing-library/react';
import ResultsComponent, {
  ResultsComponentProps,
} from '../src/ResultsComponent';

// Мокаем зависимости, такие как useLocation и useNavigate
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ search: '?page=1' }),
  useNavigate: () => jest.fn(),
}));

describe('ResultsComponent', () => {
  it('рендерит состояние загрузки', async () => {
    const props: ResultsComponentProps = { searchTerm: '' };
    const { getByText } = render(<ResultsComponent {...props} />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('рендерит состояние ошибки при ошибке запроса', async () => {
    const props: ResultsComponentProps = { searchTerm: '' };

    // Мокаем fetch для симуляции ошибки
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.reject(new Error('Fake error')));

    const { getByText } = render(<ResultsComponent {...props} />);
    expect(
      await getByText(
        'We dont have such pokemon. LETTER CASE MATTERS. Clear the search bar and press search to display the list',
      ),
    ).toBeTruthy();
  });

  // Добавьте больше тестов по мере необходимости для различных сценариев
});
