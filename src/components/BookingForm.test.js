import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('Renders the BookingForm heading', () => {
  const availableTimes = ['17:00', '18:00', '19:00']

  render(<BookingForm availableTimes={availableTimes} />);
  const headingElement = screen.getByText('Book Now');
  expect(headingElement).toBeInTheDocument();
});
