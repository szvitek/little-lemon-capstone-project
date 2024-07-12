import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="Little lemon logo" width={250} />
      </Link>
      <Nav />
    </header>
  );
}
