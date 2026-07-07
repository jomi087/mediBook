const FormInput = ({ label, type, placeholder, register, error }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        className={`border rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none
          focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all
          ${error ? 'border-red-400' : 'border-gray-300'}`}
        {...register}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
