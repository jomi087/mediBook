import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();

  // const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b  border-b-gray-400">
      <img
        onClick={() => navigate('/')}
        className="w-33 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      <ul className="hidden md:flex items-start gap-5 lg:gap-10 font-bold">
        <li className="py-1">
          <NavLink
            to="/"
            className={(obj) =>
              ` pb-1 transition-colors ${obj.isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-700'}`
            }
          >
            HOME
          </NavLink>
        </li>

        <li className="py-1">
          <NavLink
            to="/doctors"
            className={(obj) =>
              ` pb-1 transition-colors ${obj.isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-700'}`
            }
          >
            DOCTORS
          </NavLink>
        </li>

        <li className="py-1">
          <NavLink
            to="/about"
            className={(obj) =>
              ` pb-1 transition-colors ${obj.isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-700'}`
            }
          >
            ABOUT
          </NavLink>
        </li>

        <li className="py-1">
          <NavLink
            to="/contact"
            className={(obj) =>
              ` pb-1 transition-colors ${obj.isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-700'}`
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-9.5 rounded-full"
              src={assets.profile_pic}
              alt="profile pic"
            />
            <img className="w-2.5 " src={assets.dropdown_icon} alt="nav-icon" />
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
          <button
            className="bg-primary text-white px-6 py-3 rounded-full font-light hover:bg-primary-hover hidden md:block"
            onClick={() => navigate('/login')}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
