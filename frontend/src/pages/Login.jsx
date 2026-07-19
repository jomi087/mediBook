import AuthForm from '../components/auth/AuthForm.jsx';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-5 pb-15">
      <AuthForm mode="login" />
    </div>
  );
};
export default Login;
