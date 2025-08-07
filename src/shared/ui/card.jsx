export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white/20 backdrop-blur-md dark:bg-gray-800/20 rounded-2xl shadow-lg p-6 flex flex-col items-center ${className}`}
    {...props}
  >
    {children}
  </div>
);
