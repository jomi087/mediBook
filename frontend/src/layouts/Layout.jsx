import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Toaster } from 'sonner';

const Layout = () => {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster theme="dark" closeButton position="top-right" />
    </div>
  );
};

export default Layout;
