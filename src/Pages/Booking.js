import { useReducer } from 'react';
import BookingForm from '../components/BookingForm';


// reducer fn
export function updateTimes(state, action) {
  console.log(action)
  switch (action.type) {
    case 'addDate':
      const newDate = new Date(action.payload);
      return window.fetchAPI(newDate);
    default:
      return state;
  }
}

export function initializeTimes() {
  return window.fetchAPI(new Date());
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
