import { Link } from 'react-router-dom';
import heroImg from '../assets/restauranfood.jpg';

export default function CallToAction() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__details">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>

          <Link to="/booking" className="hero__link" aria-label="book a table">
            Book a table
          </Link>
        </div>

        <div className="hero__image">
          <img src={heroImg} alt="Hero" width={200} />
        </div>
      </div>
    </section>
  );
}
