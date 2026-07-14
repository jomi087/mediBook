import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/ui/Button';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-8">
      <div className="mb-6">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800">
          My Appointments
        </h1>
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mt-1">
          Your schedule
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 cursor-pointer hover:border hover:border-gray-400"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-32 h-40 sm:h-32 rounded-xl  object-contain lg:object-cover shrink-0"
            />

            {/* Details */}
            <div className="flex-1 flex flex-col gap-1.5 text-sm">
              <p className="text-base font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-primary font-medium">{item.speciality}</p>

              <div className="text-gray-500 mt-1">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-0.5">
                  Address
                </p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>

              <p className="text-gray-600 mt-1">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wide mr-1">
                  Date & Time:
                </span>
                25 July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:flex sm:flex-col gap-3 sm:w-44 sm:justify-center shrink-0">
              <Button className="w-full py-2.5 sm:py-2.5 bg-primary text-white rounded-full text-sm hover:bg-primary/90 active:scale-95 transition-all duration-200">
                Pay Online
              </Button>
              <Button className="w-full py-2.5 sm:py-2.5 border border-gray-300 text-gray-600 rounded-full text-sm hover:border-red-400 hover:text-red-500 active:scale-95 transition-all duration-200">
                Cancel Appointment
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
