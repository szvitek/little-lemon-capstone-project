import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders Little Lemon home page', () => {
  render(<App />, { wrapper: BrowserRouter });

  const element = screen.getByText(
    /We are a family owned Mediterranean restaurant/i
  );

  expect(element).toBeInTheDocument();
});
