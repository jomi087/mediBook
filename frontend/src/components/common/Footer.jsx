import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import {
  BRAND_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
} from '../../constants/appConstants';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-6 mt-10 ">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 text-sm">
        {/* left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo image" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            {BRAND_NAME} is a trusted healthcare appointment booking platform
            that connects patients with qualified doctors. We make scheduling
            medical consultations simple, fast, and convenient, helping you
            access quality healthcare whenever you need it.
          </p>
        </div>

        {/* center section */}
        <div>
          <p className="font-semibold mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 cursor-pointer">
            <li className=" hover:text-primary" onClick={() => navigate('/')}>
              {' '}
              HOME
            </li>
            <li
              className=" hover:text-primary"
              onClick={() => navigate('/about')}
            >
              {' '}
              ABOUT US
            </li>
            <li
              className=" hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              {' '}
              CONTACT US
            </li>
            <li className=" hover:text-primary"> PRIVACY POLICY</li>
          </ul>
        </div>

        {/* right section */}
        <div>
          <p className="font-semibold mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 cursor-pointer">
            <li className=" hover:text-primary">{COMPANY_PHONE}</li>
            <li className=" hover:text-primary">{COMPANY_EMAIL}</li>
          </ul>
        </div>
      </div>
      <div>
        {/* copyright text */}
        <hr />
        <p className="py-1 text-sm text-center">
          © 2026 {BRAND_NAME}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
