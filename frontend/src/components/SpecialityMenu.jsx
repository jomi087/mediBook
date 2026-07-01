import { Link } from 'react-router-dom';

// re-update the test case depending on how data is accessed
import { specialityData } from '../assets/assets';

const specialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 text-gray-800 pt-20"
      id="speciality"
    >
      <h1 className="text-3xl font-medium font-poppins">Find by Speciality</h1>
      <p className="sm:w-1/2 text-center text-sm ">
        Simply browse through our extensive list of trusted doctors, schedule
        your appintment
      </p>
      <div className="flex gap-4 pt-5 w-full overflow-x-auto md:overflow-visible md:justify-center">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer shrink-0 hover:-translate-y-2.5 transition-all duration-350 w-24 sm:w-28 "
          >
            <img
              className="w-20 md:w-24 mb-2"
              src={item.image}
              alt={item.speciality}
            />

            <p className="text-center text-sm min-h-10">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default specialityMenu;
