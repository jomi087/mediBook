const Input = ({ id, type = 'text', className, ...props }) => {
  return (
    <input
      id={id}
      type={type}
      className={`w-full rounded-lg border px-3 py-2 outline-none transition
          placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 border-gray-300
          ${className ?? ''}`}
      {...props}
    />
  );
};
export default Input;
