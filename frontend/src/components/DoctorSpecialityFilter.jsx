import Button from "./ui/Button";

const DoctorSpecialityFilter = ({ specialties, selectedSpeciality, onSelect, variant = "desktop",}) => {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "flex gap-2 overflow-x-auto pb-2 mb-6 md:hidden scrollbar-hide"
          : "flex flex-col gap-1"
      }
    >
      {specialties.map((sp) => (
        <Button
          key={sp}
          onClick={() => onSelect(sp)}
          className={
            isMobile
              ? `whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition-all ${
                  selectedSpeciality === sp
                    ? "bg-blue-50 text-blue-600 border-blue-300 font-medium"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`
              : `flex-1 text-left w-[90%] py-2 rounded-lg text-sm transition-all ${
                  selectedSpeciality === sp
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:pl-1.5"
                }`
          }
        >
          {sp}
        </Button>
      ))}
    </div>
  );
};

export default DoctorSpecialityFilter;