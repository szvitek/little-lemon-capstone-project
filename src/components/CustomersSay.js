const feedbacks = [
  {
    name: 'Oliver',
    img: 'https://unsplash.com/photos/6anudmpILw4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mzh8fHBvcnRyYWl0fGVufDB8fHx8MTcyMDc3NTE3OXww&force=true&w=640',
    rating: 5,
    text: 'Best pizzas in town',
  },
  {
    name: 'Sofia',
    img: 'https://unsplash.com/photos/IF9TK5Uy-KI/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzIwNzc3OTg3fA&force=true&w=640',
    rating: 5,
    text: 'Little Lemon staff always go above and beyond. Quality food and professional serving.',
  },
  {
    name: 'Hugo',
    img: 'https://unsplash.com/photos/ILip77SbmOE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzIwNzY2NjUxfA&force=true&w=640',
    rating: 4,

    text: 'Food is so good but the place is always crowded, the dining area could be bigger',
  },
];

function CustomerCard({ name, img, rating, text }) {
  return (
    <div className="customer-card">
      <img className="customer-card__image" src={img} alt="customer" />
      <div className="customer-card__details">
        <h4 className="customer-card__name">{name}</h4>
        <span className="customer-card__rating">5/{rating}</span>
        <p className="customer-card__text">{text}</p>
      </div>
    </div>
  );
}

export default function CustomersSay() {
  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <h2>Testimonials</h2>
        
        {/* cards container */}
        <div className="testimonials__cards">
          {feedbacks.map((feedback) => (
            <CustomerCard
              key={feedback.name}
              name={feedback.name}
              img={feedback.img}
              rating={feedback.rating}
              text={feedback.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
