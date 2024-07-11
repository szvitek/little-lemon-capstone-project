import { Link } from 'react-router-dom';
import basketIcon from '../assets/Basket.svg';
import greekSalad from '../assets/greek_salad.jpg';

function Card() {
  return (
    <div className="card">
      <img
        className="card__img"
        src={greekSalad}
        alt="greek salad"
        height={250}
      />
      <div className="card__content">
        <div className="card__header">
          <h4>Greek Salad</h4>
          <h4 className='card__price'>$12.99</h4>
        </div>
        <div className="card__desc">
          The famous greek salad of crispy lettuce, peppers, olives and our
          chicago style feta cheese.garnished with crunchy garlic and rosemary
          croutons.
        </div>
        <Link className="card__action" to="/order">
          Order for delivery
          <img src={basketIcon} alt="basket icon" height={20} />
        </Link>
      </div>
    </div>
  );
}

export default function Specials() {
  return (
    <section className="specials">
      <div className="specials__container">
        <div className="specials__header">
          <h3>Specials</h3>
          <Link to="/menu" className="specials__link">
            Online Menu
          </Link>
        </div>
        {/* cards-container */}
        <div className="specials__card-container">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
}
