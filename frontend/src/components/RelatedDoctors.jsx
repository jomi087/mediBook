import { memo, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const relDoc =
    doctors.length > 0 && speciality
      ? doctors.filter(
          (doc) => doc.speciality === speciality && doc._id != docId
        )
      : [];

  return (
    <div className="flex flex-col items-center gap-5 text-gray-900  pt-15 max-sm:pt-8 max-sm:gap-3">
      <h1 className="text-3xl font-medium max-sm:text-xl">Related Doctors </h1>
      <p className="sm:w-1/3 text-center text-sm max-sm:text-xs max-sm:px-4">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 max-sm:grid-cols-2 max-sm:gap-3 max-sm:gap-y-4 max-sm:pt-2">
        {relDoc.slice(0, 5).map((item) => (
          <Link
            to={`/appointment/${item._id}`}
            onClick={() => window.scrollTo(0, 0)}
            key={item._id}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500 "
          >
            <img
              className="bg-blue-50 w-full aspect-square object-cover"
              src={item.image}
              alt="docter image"
            />
            <div className="p-4 max-sm:p-2.5">
              <div className="flex items-center gap-2 text-sm text-center text-green-500 max-sm:gap-1 max-sm:text-xs">
                <p className="w-2 h-2 bg-green-500 rounded-full max-sm:w-1.5 max-sm:h-1.5"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium max-sm:text-sm max-sm:truncate">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm max-sm:text-xs max-sm:truncate">
                {item.speciality}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="rounded-full mt-10 bg-blue-50 text-gray-600 px-12 py-3 max-sm:mt-4 max-sm:px-8 max-sm:py-2.5 max-sm:text-sm"
      >
        More
      </button>
    </div>
  );
};

export default memo(RelatedDoctors);
