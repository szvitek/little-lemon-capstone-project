export default function Sidebar({ children, isOpen }) {
  return <div className={ isOpen ? 'sidebar sidebar--open' : 'sidebar' }>{children}</div>;
}
