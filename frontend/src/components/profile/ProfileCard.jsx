import Button from '../ui/Button';
import Input from '../ui/Input';

const ProfileCard = ({ userData, isEdit, register, errors, handleEdit }) => {
  return (
    <div className="lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-10 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
        />

        {isEdit ? (
          <div className="w-full">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input id="name" {...register('name')} className="text-center" />
            {errors.name && (
              <p className="text-xs text-red-500 pt-1">{errors.name.message}</p>
            )}
          </div>
        ) : (
          <h1 className="text-xl font-semibold text-gray-800">
            {userData.name}
          </h1>
        )}

        <p className="text-sm text-gray-400 break-all">{userData.email}</p>

        {!isEdit ? (
          <Button
            key="edit-button"
            className="w-full bg-primary text-white py-2.5 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200"
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            key="save-button"
            className="w-full bg-primary text-white py-2.5 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200"
            type={'submit'}
          >
            Save Information
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
