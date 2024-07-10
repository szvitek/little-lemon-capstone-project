import { useState } from 'react';
import hamburger from '../assets/icon _hamburger menu.svg'
import close from '../assets/icon_close.svg'
import Sidebar from './Sidebar';

const menuItems = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'About' },
  { href: '#', text: 'Menu' },
  { href: '#', text: 'Reservations' },
  { href: '#', text: 'Order Online' },
  { href: '#', text: 'Login' },
];

function NavLinks() {
  return (
    <ul className="nav__list">
      {menuItems.map((menu) => (
        <li key={menu.text}>
          <a href={menu.href}>{menu.text}</a>
        </li>
      ))}
    </ul>
  );
}

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const closeMenuOnMobile = () => {
  //   if (window.innerWidth <= 1150) {
  //     setShowMenu(false);
  //   }
  // };
  
  return (
    <>
      <nav className="nav">
        <div className="nav__desktop">
          <NavLinks />
        </div>
        <div className="nav__mobile">
          <button onClick={toggleMenu}>
            {!showMenu ? (
              <img
                key="open"
                className="hamburger-icon"
                src={hamburger}
                alt="hamburger menu icon"
              />
            ) : (
              <img
                key="close"
                className="hamburger-icon--close"
                src={close}
                alt="close hamburger menu icon"
              />
            )}
          </button>
        </div>
        <Sidebar isOpen={showMenu}>
          <NavLinks />
        </Sidebar>
      </nav>
    </>
  );
}
