import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const today = new Date().toISOString().split('T')[0];

export default function BookingForm({ availableTimes, dispatch, onSubmit }) {
  const navigate = useNavigate();
  
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(availableTimes[0]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('birthday');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      date,
      time,
      guests,
      occasion,
    });

    const result = onSubmit({
      date,
      time,
      guests,
      occasion,
    });

    if (result) {
      navigate('/booking/confirmed');
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book Now</h2>

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value)
          dispatch({ type: 'addDate', payload: e.target.value })
        }}
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
      </select>

      <input type="submit" value="Make Your reservation"></input>
    </form>
  );
}
