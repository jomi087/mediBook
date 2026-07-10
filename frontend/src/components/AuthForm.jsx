import { Link } from 'react-router-dom';
import Button from './ui/Button';
import FormInput from './common/FormInput';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = ({ mode }) => {
  const isLogin = mode === 'login';
  const { register, handleSubmit, errors, onSubmit } = useAuthForm(isLogin);
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-200 p-8 flex flex-col gap-5"
    >
      <div className="text-center mb-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Welcome {isLogin ? 'back' : ''} to MediBook
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 mt-1">
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
      />
      {/* Password */}
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        register={register('password')}
        error={errors.password}
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
