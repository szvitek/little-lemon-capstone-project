import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { BrowserRouter } from 'react-router-dom';

test('Renders the BookingForm', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} />
    </BrowserRouter>
  );
  const headingElement = screen.getByText('Book Now');
  expect(headingElement).toBeInTheDocument();
});
