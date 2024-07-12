import { Outlet } from 'react-router-dom';
// import BookingForm from '../components/BookingForm';

export default function Booking() {
  return (
    <div className="booking__container">
      <Outlet />
    </div>
  );
}
