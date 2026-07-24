const FormInput = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  autoComplete,
  rightElement,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-700 outline-none transition-all
          focus:border-primary focus:ring-2 focus:ring-primary/30
          ${rightElement ? 'pr-12' : ''}
          ${error ? 'border-red-400' : 'border-gray-300'}`}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormInput;
