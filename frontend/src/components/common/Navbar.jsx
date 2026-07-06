import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'DOCTORS', path: '/doctors' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate('/')}
        className={`${showMenu ? 'invisible' : 'visible'} w-33 cursor-pointer`}
        src={assets.logo}
        alt="logo"
      />

      <ul className="hidden md:flex items-start gap-5 lg:gap-10 font-bold">
        {navLinks.map(({ path, name }) => (
          <li key={name} className="py-1">
            <NavLink
              to={path}
              className={(obj) =>
                ` pb-1 transition-colors ${obj.isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-700'}`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-9.5 rounded-full"
              src={assets.profile_pic}
              alt="profile pic"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="nav-icon" />
            <div className="absolute top-0 right-0 pt-15 text-base font-medium text-gray-600/90 z-20 hidden group-hover:block">
              <div className="min-w-44 bg-stone-100 rounded-lg flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Button
            className="bg-primary text-white px-6 py-3 rounded-full font-light hover:bg-primary-hover hidden md:block"
            onClick={() => navigate('/login')}
          >
            Sign-In
          </Button>
        )}

        {/* Mobile menu trigger */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu icon"
        />

        {/* Backdrop */}
        <div
          onClick={() => setShowMenu(false)}
          className={`fixed inset-0 bg-black/40 z-20 transition-opacity duration-300 md:hidden
            ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />

        {/* Mobile panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[70%] max-w-xs bg-white shadow-2xl
            flex flex-col transition-transform duration-300 z-30
            ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <img className="w-28" src={assets.logo} alt="logo" />
            <img
              className="w-5 cursor-pointer"
              src={assets.cross_icon}
              onClick={() => setShowMenu(false)}
              alt="close menu"
            />
          </div>

          <ul className="flex flex-col px-3 py-4 text-sm font-medium">
            {navLinks.map(({ path, name }) => (
              <li key={name}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to={path}
                  className={(obj) =>
                    `block px-3 py-3 rounded-lg font-mono! transition-colors ${
                      obj.isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto px-3 py-4 border-t border-gray-100">
            {token ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 pb-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={assets.profile_pic}
                    alt="profile pic"
                  />
                  <p className="text-sm text-gray-500">My Account</p>
                </div>
                <p
                  onClick={() => {
                    navigate('/my-profile');
                    setShowMenu(false);
                  }}
                  className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/my-appointments');
                    setShowMenu(false);
                  }}
                  className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    setShowMenu(false);
                  }}
                  className="px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            ) : (
              <Button
                className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-hover"
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
