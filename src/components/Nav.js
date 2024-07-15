import { useState } from 'react';
import hamburger from '../assets/icon _hamburger menu.svg';
import close from '../assets/icon_close.svg';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/menu', text: 'Menu' },
  { href: '/booking', text: 'Reservations' },
  { href: '/order', text: 'Order Online' },
  { href: '/login', text: 'Login' },
];

function NavLinks({ handleClick }) {
  return (
    <ul className="nav__list">
      {menuItems.map((menu) => (
        <li
          key={menu.text}
        >
          <NavLink
            to={menu.href}
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
            onClick={handleClick}
            aria-label={menu.text}
          >
            {menu.text}
          </NavLink>
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

  const closeMenuOnMobile = () => {
    if (window.innerWidth < 720) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__desktop">
          <NavLinks handleClick={closeMenuOnMobile} />
        </div>
        <div className="nav__mobile">
          <button
            onClick={toggleMenu}
            aria-label="hamburger menu"
            aria-expanded={showMenu}
          >
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
          <NavLinks handleClick={closeMenuOnMobile} />
        </Sidebar>
      </nav>
    </>
  );
}
