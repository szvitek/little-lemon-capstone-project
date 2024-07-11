export default function CustomersSay() {
  return (
    <section className="testimonials">
      <div class="testimonials__container">
        <h3>Testimonials</h3>
        {/* cards container */}
        <div className="testimonials__cards">
          {/* card *3 */}
          <div>
            <h4>Name</h4>
            <img src="" alt="" />
            <span>Rating</span>
            <p>this user said this dish is amazing</p>
          </div>
        </div>
      </div>
    </section>
  );
}