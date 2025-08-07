import { motion } from "framer-motion";

export const Loader = ({ message = "Ma'lumotlar yuklanmoqda..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-xl text-gray-800 dark:text-gray-300 text-center"
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
};
