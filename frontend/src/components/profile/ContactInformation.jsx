import Input from '../ui/Input';

const ContactInformation = ({ userData, isEdit, register, errors }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-5">
        Contact Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-7 gap-x-4 text-sm items-start">
        <p className="text-gray-400 font-medium pt-2">Email</p>
        <p className="text-gray-700 pt-2">{userData.email}</p>

        <label htmlFor="phone" className="text-gray-400 font-medium pt-2">
          Phone
        </label>
        {isEdit ? (
          <div className="w-full">
            <Input id="phone" {...register('phone')} />
            {errors.phone && (
              <p className="text-xs text-red-500 absolute pl-1 pt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-700 pt-2">{userData.phone}</p>
        )}

        <p className="text-gray-400 font-medium pt-2">Address</p>
        {isEdit ? (
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <label
                htmlFor="line1"
                className="text-sm font-medium text-gray-700"
              >
                Line 1
              </label>

              <Input id="line1" {...register('line1')} />
              {errors.line1 && (
                <p className="text-xs text-red-500 p-1">
                  {errors.line1.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="line2"
                className="text-sm font-medium text-gray-700"
              >
                Line 2
              </label>
              <Input id="line2" {...register('line2')} />
              {errors.line2 && (
                <p className="text-xs text-red-500 p-1">
                  {errors.line2.message}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-700 pt-2">
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
