import { assets } from '../../assets/assets.js';

const NavbarAuthSkeleton = () => {
  return (
    <div className="hidden md:flex items-center gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-300" />
      <img className="w-2" src={assets.dropdown_icon} alt="nav-icon" />
    </div>
  );
};

export default NavbarAuthSkeleton;
