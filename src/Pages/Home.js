import CallToAction from "../components/CallToAction";
import Chicago from "../components/Chicago";
import CustomersSay from "../components/CustomersSay";
import Specials from "../components/Specials";

export default function Home() {
  return (
    <div>
      <h1>test h1</h1>
      <h2>test h2</h2>
      <h3>test h3</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad placeat
        nulla accusamus accusantium, debitis corporis ullam enim ratione
        delectus aut quis, illo distinctio esse aspernatur nobis a. Ex,
        repudiandae illo?
      </p>

      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </div>
  );
}
