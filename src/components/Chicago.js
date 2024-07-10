import chcagoImg1 from '../assets/Mario and Adrian A.jpg';
import chcagoImg2 from '../assets/Mario and Adrian b.jpg';

export default function Chicago() {
  return (
    <section>
      <div>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ab maiores laboriosam autem, libero ducimus, corrupti rem obcaecati, eius tenetur dolore quibusdam quasi sed iusto voluptatum delectus dolores earum voluptate voluptas ea sequi praesentium. Iste ipsam fugiat ducimus eveniet repellat, esse ipsum illo voluptates sequi? Quaerat deserunt beatae culpa earum!
        </p>
      </div>
      <div>
        <img src={chcagoImg1} alt="Chicago 1" height={200} />
        <img src={chcagoImg2} alt="Chicago 2" height={200} />
      </div>
    </section>
  );
}
