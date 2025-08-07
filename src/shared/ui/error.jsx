import { motion } from "framer-motion";

export const ErrorMessage = ({
  message = "Ma'lumotlarni yuklashda xatolik yuz berdi.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-red-500 dark:text-red-400 text-center"
      role="alert"
    >
      {message}
    </motion.div>
  );
};
