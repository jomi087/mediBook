const Button = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`
        cursor-pointer
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
