import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import DoctorSpecialityFilter from '../components/DoctorSpecialityFilter';
import { specialties } from '../constants/specialtiesConstants';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();

  const { doctors } = useContext(AppContext);

  const filterDoc = speciality
    ? doctors.filter((doc) => doc.speciality === speciality)
    : doctors;

  const handleSpecialityClick = (sp) => {
    if (speciality === sp) {
      navigate('/doctors');
    } else {
      navigate(`/doctors/${sp}`);
    }
  };

  return (
    <div>
      {/* Mobile */}
      <div className="mb-6 text-center md:hidden scrollbar-hide">
        <h1 className="text-2xl font-semibold text-gray-900">
          Find a specialist
        </h1>
        <p className="text-gray-500 text-sm ">
          Browse doctors by specialty and book your appointment.
        </p>
      </div>

      {/* Mobile chip row */}
      <DoctorSpecialityFilter
        variant="mobile"
        specialties={specialties}
        selectedSpeciality={speciality}
        onSelect={handleSpecialityClick}
      />

      
      <div className="flex gap-6 mt-5 ">
        
        {/* Desktop version */}
        <aside className="hidden md:block w-44 shrink-0">
          <p className="text-xs my-4 font-semibold text-gray-500 uppercase underline underline-offset-4 tracking-wider mb-3">
            Specialty
          </p>
          <DoctorSpecialityFilter
            variant="desktop"
            specialties={specialties}
            selectedSpeciality={speciality}
            onSelect={handleSpecialityClick}
          />
        </aside>

        {/* filterd doctors */}
        <div className="flex-1 min-w-0">
          <div className="hidden md:block mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Find a specialist
            </h1>
            <p className="text-gray-500 text-sm ">
              Browse doctors by specialty and book your appointment.
            </p>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''}{' '}
            available
          </p>

          {filterDoc.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No doctors found for this specialty.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterDoc.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer
                             hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm
                             transition-all duration-200"
                >
                  <img
                    className="w-full aspect-square object-cover bg-blue-50"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                      <span className="text-xs text-green-600 font-medium">
                        Available
                      </span>
                    </div>
                    <p className="text-gray-900 text-sm font-medium leading-snug">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {item.speciality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
