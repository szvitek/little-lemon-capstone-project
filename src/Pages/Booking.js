import { useReducer } from 'react';
import BookingForm from '../components/BookingForm';

// reducer fn
export function updateTimes(state, action) {
  return state;
}

export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export default function Booking() {


  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );

  return (
    <div className="booking__container">
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}
