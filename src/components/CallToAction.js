import heroImg from '../assets/restauranfood.jpg';

export default function CallToAction() {
  return (
    <section>
      <div>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </p>

        <button>
          Book a table
        </button>
      </div>

      <div>
        <img src={heroImg} alt="Hero" width={200} />
      </div>
    </section>
  );
}
