import { Link } from 'react-router-dom';
import basketIcon from '../assets/Basket.svg';


import greekSalad from '../assets/greek_salad.jpg';
import bruchetta from '../assets/bruchetta.jpg';
import lemonDessert from '../assets/lemon dessert.jpg';

const items = [
  {
    id: '1111',
    img: greekSalad,
    name: 'Greek Salad',
    price: 12.99,
    description:
      'Greek salad or horiatiki salad is a popular salad in Greek cuisine generally made with pieces of tomatoes, cucumbers, onion, feta cheese, and olives and dressed with salt, Greek oregano, lemon juice and olive oil. Common additions include green bell pepper slices or caper berries.',
  },
  {
    id: '2222',
    img: bruchetta,
    name: 'Bruchetta',
    price: 5.99,
    description:
      'Bruschetta is an Italian antipasto consisting of grilled bread often topped with olive oil and salt. Most commonly it is served with toppings of tomato, vegetables, beans, cured meat, and/or cheese. In Italy, bruschetta is often prepared using a brustolina grill.',
  },
  {
    id: '3333',
    img: lemonDessert,
    name: 'Lemon Dessert',
    price: 5.00,
    description:
      'Lemon meringue pie is a dessert pie consisting of a shortened pastry base filled with lemon curd and topped with meringue.',
  },
];

function Card({ id, img, name, price, description }) {
  return (
    <div className="card">
      <img
        className="card__img"
        src={img}
        alt={name}
        height={250}
      />
      <div className="card__content">
        <div className="card__header">
          <h4>{ name }</h4>
          <h4 className="card__price">${price}</h4>
        </div>
        <div className="card__desc" title={description}>
          {description}
        </div>
        <Link
          className="card__action"
          to={`/order?item=${id}`}
          aria-label="Order for delivery"
        >
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
          {items.map(item => (
            <Card key={item.id} {...item} />
          )) }
        </div>
      </div>
    </section>
  );
}
