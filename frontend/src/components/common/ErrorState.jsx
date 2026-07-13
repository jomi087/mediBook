import Button from '../ui/Button';

const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again later.',
  onRetry,
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        <p className="mt-3 text-gray-500">{description}</p>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
