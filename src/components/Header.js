import logo from '../assets/logo.png'
import Nav from "./Nav";

export default function Header() {
  return <header>
    <img src={logo} alt="Little lemon logo" width={250} />
    <Nav />
  </header>;
}
