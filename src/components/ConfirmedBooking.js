import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function ConfirmedBooking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const date = params.get('date');
  const time = params.get('time');
  const guests = params.get('guests');
  const occasion = params.get('occasion');
  const name = params.get('name');
  const email = params.get('email');

  const shouldNavigate =
    !date || !time || !guests || !occasion || !name || !email;

  useEffect(() => {
    if (shouldNavigate) {
      return navigate('/', { replace: true });
    }
  }, [navigate, shouldNavigate]);

  return (
    <div className="confirmation">
      <h2 className="confirmation__title">Your booking has been confirmed</h2>

      <p className="confirmation__message">
        Dear {name}, This confirms your booking ({occasion}) for {guests} guests
        with Little Lemon Restaurant for {date} at {time}. We look forward to
        seeing you. We also sent you an email to your email address ({email})
      </p>

      <Link className="confirmation__link" to="/">
        Back to home page
      </Link>
    </div>
  );
}
