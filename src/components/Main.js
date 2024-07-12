import { useReducer } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { initializeTimes, updateTimes } from '../lib/utils';
import ErrorPage from '../Pages/Error';
import Home from '../Pages/Home';
import Booking from '../Pages/Booking';
import About from '../Pages/About';
import Menu from '../Pages/Menu';
import Order from '../Pages/Order';
import Login from '../Pages/Login';
import ConfirmedBooking from './ConfirmedBooking';
import BookingForm from './BookingForm';
import { submitAPI } from '../lib/api';

export default function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );

  function submitForm(formData) {
    return submitAPI(formData);
  }

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Outlet />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="booking" element={<Booking />}>
            <Route
              index
              element={
                <BookingForm
                  availableTimes={availableTimes}
                  dispatch={dispatch}
                  onSubmit={submitForm}
                />
              }
            />
            <Route path="confirmed" element={<ConfirmedBooking />} />
          </Route>
          <Route path="order" element={<Order />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
}
