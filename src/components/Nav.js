const menuItems = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'About' },
  { href: '#', text: 'Menu' },
  { href: '#', text: 'Reservations' },
  { href: '#', text: 'Order Online' },
  { href: '#', text: 'Login' },
];

export default function Nav() {
  return (
    <nav>
      <ul>
        {menuItems.map((menu) => (
          <li key={menu.text}>
            <a href={menu.href}>{menu.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
