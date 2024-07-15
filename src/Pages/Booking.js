import { Outlet } from 'react-router-dom';
import Placeholder from '../components/Placeholder';

export default function Booking() {
  return (
    
    <div className="booking__container">
      <Placeholder displayTitle={false}>
      <Outlet />
    </Placeholder>
    </div>
  );
}
