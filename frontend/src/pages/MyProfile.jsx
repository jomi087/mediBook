import { useCallback, useEffect, useState } from 'react';
import profileService from '../services/profileService';
import Spinner from '../components/common/Spinner';
import useProfileForm from '../hooks/useProfileForm';
import ProfileCard from '../components/profile/ProfileCard';
import ContactInformation from '../components/profile/ContactInformation';
import BasicInformation from '../components/profile/BasicInformation';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const { register, handleSubmit, errors, handleEdit, onSubmit } =
    useProfileForm({
      userData,
      setUserData,
      setIsEdit,
    });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await profileService.getProfile();
      setUserData(res.data);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ?? err.message ?? 'Failed to load profile.';

      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load profile"
        description={error}
        onRetry={fetchProfile}
        loading={loading}
        actions={
          <div className="flex gap-4">
            <Button
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90"
              onClick={fetchProfile}
            >
              Try Again
            </Button>

            <Button
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-10 flex flex-col lg:flex-row gap-8 mb-20">
        {/* Left: photo + identity */}
        <ProfileCard
          userData={userData}
          isEdit={isEdit}
          register={register}
          errors={errors}
          handleEdit={handleEdit}
        />

        {/* Right: details */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Contact information */}
          <ContactInformation
            userData={userData}
            isEdit={isEdit}
            register={register}
            errors={errors}
          />

          {/* Basic information */}
          <BasicInformation
            userData={userData}
            isEdit={isEdit}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};

export default MyProfile;
