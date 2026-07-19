import AuthForm from '../components/auth/AuthForm.jsx';

const Signup = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-5 pb-15">
      <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
