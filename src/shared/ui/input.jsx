export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-1 md:py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary transition-colors duration-200 dark:bg-gray-700/20 dark:border-gray-600 dark:text-white bg-white/20 backdrop-blur-md !rounded-2xl ${className}`}
    {...props}
  />
);
