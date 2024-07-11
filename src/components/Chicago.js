import chcagoImg1 from '../assets/Mario and Adrian A.jpg';
import chcagoImg2 from '../assets/Mario and Adrian b.jpg';

export default function Chicago() {
  return (
    <section className="chicago">
      <div className="chicago__container">
        <div className="chicago__details">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            Little Lemon is owned by two Italian brothers, Mario and Adrian, who
            moved to the United States to pursue their shared dream of owning a
            restaurant.
          </p>
          <p>
            To craft the menu, Mario relies on family recipes and his experience
            as a chef in Italy. Adrian does all the marketing for the restaurant
            and led the effort to expand the menu beyond classic Italian to
            incorporate additional cuisines from the Mediterranean region.
          </p>
        </div>
        <div className="chicago__images">
          <img
            className="chicago__image chicago__image--bg"
            src={chcagoImg1}
            alt="Chicago 1"
            height={200}
          />
          <img
            className="chicago__image chicago__image--fg"
            src={chcagoImg2}
            alt="Chicago 2"
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
