import basketIcon from '../assets/Basket.svg';
import greekSalad from '../assets/greek_salad.jpg'

export default function Specials() {
  return (
    <section>
      <div>
        <h3>Specials</h3>
        <button>Online Menu</button>
      </div>

      {/* cards-container */}
      <div>
        {/* card */}
        <div>
          <img src={greekSalad} alt="greek salad" />

          <div>
            <h4>Greek Salad</h4>
            <h4>$12.99</h4>
          </div>
          <p>
            The famous greek salad of crispy lettuce, peppers, olives and our
            chicago style feta cheese.garnished with crunchy garlic and rosemary
            croutons.
          </p>
          <button>
            Order for delivery
            <img src={basketIcon} alt="basket icon" height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
