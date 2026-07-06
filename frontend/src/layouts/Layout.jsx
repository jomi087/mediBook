import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Layout = () => {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
