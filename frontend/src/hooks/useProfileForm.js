import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../validations/profileSchema';

const useProfileForm = ({ userData, setUserData, setIsEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
  });

  const handleEdit = () => {
    reset({
      name: userData.name,
      phone: userData.phone,
      line1: userData.address.line1,
      line2: userData.address.line2,
      gender: userData.gender,
      dob: userData.dob,
    });
    setIsEdit(true);
  };

  const onSubmit = (data) => {
    const updatedUser = {
      ...userData,
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      address: {
        line1: data.line1,
        line2: data.line2,
      },
    };
    setUserData(updatedUser);
    setIsEdit(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    handleEdit,
    onSubmit,
  };
};

export default useProfileForm;
