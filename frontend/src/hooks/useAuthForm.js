import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../validations/authSchema';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.js';
import { getErrorMessage } from '../services/errorHandler.js';


const schemaMap = {
  login: loginSchema,
  signup: signupSchema,
};


const useAuthForm = (mode) => {
  const navigate = useNavigate()
  const { login, signup } = useAuth();
  const actionMap = { login, signup };

  const schema = schemaMap[mode];
  const authAction = actionMap[mode];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    //{email: 'abc@gmail.com', password: 'aq1234@Aweq'}
    try {
      const userInfo = await authAction(data);

      if (userInfo.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (userInfo.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
  };
};

export default useAuthForm;
