import { Link } from 'react-router-dom';
import FormInput from '../common/FormInput.jsx';
import useAuthForm from '../../hooks/useAuthForm.js';
import Button from '../ui/Button.jsx';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { generatePassword } from '../../utils/generatePassword.js';

const AuthForm = ({ mode }) => {
  const isLogin = mode === 'login';
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors, onSubmit, setValue } =
    useAuthForm(mode);

  const autoFill = (isChecked) => {
    if (isChecked) {
      setValue('email', import.meta.env.VITE_EMAILID);
      setValue('password', import.meta.env.VITE_PASSWORD);
    } else {
      setValue('email', '');
      setValue('password', '');
    }
  };

  const genPass = () => {
    const pass = generatePassword();
    setValue('password', pass);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm sm:max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-200 p-5 sm:p-8 flex flex-col gap-5"
    >
      <div className="text-center sm:mb-2">
        <p className="pt-2 sm:pt-0 text-sm sm:text-xs font-semibold sm:tracking-[0.2em] text-primary uppercase">
          Welcome {isLogin ? 'back' : ''} to MediBook
        </p>
        <h1 className="hidden sm:block text-lg font-semibold text-gray-800 mt-1">
          {isLogin ? 'Log in' : 'Sign up'} to MediBook
        </h1>
      </div>
      {/* Name */}
      {!isLogin && (
        <FormInput
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          register={register('name')}
          error={errors.name}
          autoComplete="name"
        />
      )}

      {/* Email */}
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        register={register('email')}
        error={errors.email}
        autoComplete="email"
      />
      {/* Password */}
      <FormInput
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        register={register('password')}
        error={errors.password}
        autoComplete="new-password"
        rightElement={
          <Button
            type="button"
            className="flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        }
      />

      <Button
        type="submit"
        className="mt-2 bg-primary text-white text-sm font-medium py-3 rounded-full
        hover:bg-primary/90 active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Submit
      </Button>

      {isLogin ? (
        <div className="flex gap-2 justify-end">
          <input
            type="checkbox"
            className="border"
            onChange={(e) => autoFill(e.target.checked)}
          />
          <span className="text-sm ">Auto Fill</span>
        </div>
      ) : (
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="w-full sm:w-auto border text-gray-600 cursor-pointer text-xs p-1 rounded-lg border-gray-400 "
            onClick={genPass}
          >
            Generate Password
          </button>
        </div>
      )}

      {isLogin ? (
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
            onClick={() => scroll(0, 0)}
          >
            log in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
