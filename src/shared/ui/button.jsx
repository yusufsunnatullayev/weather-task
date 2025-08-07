export const Button = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`bg-primary text-white font-medium py-1 md:py-2 px-4 rounded-2xl shadow-md hover:opacity-80 duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);
