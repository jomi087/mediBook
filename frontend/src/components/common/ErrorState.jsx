
const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again later.',
  actions,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        <p className="mt-3 text-gray-500">{description}</p>

        <div className="mt-6">{actions}</div>
      </div>
    </div>
  );
};

export default ErrorState;
