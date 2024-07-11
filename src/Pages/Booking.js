import { useReducer, useState } from 'react';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  // reducer fn
  function updateTimes(state, action) {
    return state;
  }

  function initializeTimes() {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  }

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div className="booking__container">
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}
