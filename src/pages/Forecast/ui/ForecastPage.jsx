import { useForecast } from "@shared/hooks/weather/use-weather";
import { AnimatePresence } from "framer-motion";
import { ForecastDayCard } from "@widgets/forecast-day-card";
import { capitalizeFirstLetter } from "@shared/lib/utils";
import useWeatherStore from "@shared/store/weatherStore";
import { ErrorMessage, Loader } from "@shared/ui";

export const ForecastPage = () => {
  const city = useWeatherStore((state) => state.city);
  const { data, isLoading, isError } = useForecast(city, !!city);

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start pt-10 md:pt-20 z-10">
      <h2
        className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center"
        aria-label="5 kunlik ob-havo prognozi"
      >
        {city
          ? `${capitalizeFirstLetter(city)} uchun 5 kunlik prognoz`
          : "Iltimos, shahar nomini kiriting"}
      </h2>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && (
        <AnimatePresence>
          <div className="w-full h-full p-4 flex justify-start md:justify-center overflow-x-scroll md:overflow-hidden md:flex-wrap gap-3 md:gap-6">
            {data.map((day, index) => (
              <ForecastDayCard key={index} data={day} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </main>
  );
};
