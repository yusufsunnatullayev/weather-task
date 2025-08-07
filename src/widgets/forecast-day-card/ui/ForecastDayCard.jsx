import {
  capitalizeFirstLetter,
  getDayName,
  getForecastDate,
} from "@shared/lib/utils";
import { motion } from "framer-motion";

export const ForecastDayCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const date = getForecastDate(data.dt_txt);
  const dayName = getDayName(data.dt_txt);
  const temp = Math.round(data.main.temp);
  const icon = data.weather[0]?.icon;
  const description = data.weather[0]?.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      className="w-full h-96 md:h-52 md:w-1/4 bg-white/20 backdrop-blur-md dark:bg-gray-800/20 rounded-2xl shadow-md px-20 md:px-4 py-8 text-center flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20"
    >
      <div className="flex flex-col items-center">
        <p className="text-5xl font-bold text-gray-800 dark:text-gray-100">
          {dayName}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-400">{date}</p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-20 h-20 mx-auto"
        />
        <p className="text-3xl font-bold text-primary">{temp}°C</p>
        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
          {capitalizeFirstLetter(description)}
        </p>
      </div>
    </motion.div>
  );
};
