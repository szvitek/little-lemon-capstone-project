import { useState } from 'react';

export default function BookingForm() {
  const [availableTimes, setAvailableTimes] = useState([
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0]);
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('birthday');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      date,
      time,
      guests,
      occasion
    })
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
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
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
        </select>
      </div>

      <input type="submit" value="Make Your reservation"></input>
    </form>
  );
}
