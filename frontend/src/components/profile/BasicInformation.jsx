import Input from '../ui/Input';

const BasicInformation = ({ userData, isEdit, register, errors }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-5">
        Basic Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-5 gap-x-4 text-sm items-start">
        <label htmlFor="gender" className="text-gray-400 font-medium pt-2">
          Gender
        </label>
        {isEdit ? (
          <div>
            <select
              id="gender"
              {...register('gender')}
              className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none
                           focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 p-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-700 pt-2 capitalize">{userData.gender}</p>
        )}
        <label htmlFor="dob" className="text-gray-400 font-medium pt-2">
          Date of birth
        </label>
        {isEdit ? (
          <div className="w-full max-w-50">
            <Input id="dob" {...register('dob')} type="date" />
            {errors.dob && (
              <p className="text-xs text-red-500 p-1">{errors.dob.message}</p>
            )}
          </div>
        ) : (
          <p className="text-gray-700 pt-2">{userData.dob}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
