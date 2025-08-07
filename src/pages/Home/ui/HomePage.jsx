import { useCurrentWeather } from "@shared/hooks/weather/use-weather";
import { CitySearch } from "@features/city-search";
import { WeatherCard } from "@widgets/weather-card";
import { useEffect } from "react";
import axios from "axios";
import { API_KEY } from "@shared/config/constants";
import useWeatherStore from "@shared/store/weatherStore";
import { Loader, ErrorMessage } from "@shared/ui";

export const HomePage = () => {
  const city = useWeatherStore((state) => state.city);
  const setDefaultCity = useWeatherStore((state) => state.setDefaultCity);
  const onSearch = useWeatherStore((state) => state.setCity);
  const { data, isLoading, isError } = useCurrentWeather(city, !!city);

  useEffect(() => {
    if ("geolocation" in navigator && !city) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const { data } = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uz`
            );
            setDefaultCity(data.name);
            onSearch(data.name);
          } catch (e) {
            console.error("Geolokatsiya bo'yicha ob-havoni olib bo'lmadi:", e);
          }
        },
        (err) => {
          console.error("Geolokatsiya xatosi:", err);
        }
      );
    }
  }, [city, onSearch]);

  return (
    <main className="w-full px-5 md:px-0 flex-1 flex flex-col justify-start pt-10 md:pt-20 items-center bg-center bg-cover z-10">
      <div className="w-full md:w-1/4 flex flex-col items-center">
        <h2
          className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 md:mb-6"
          aria-label="Asosiy sahifa sarlavhasi"
        >
          Hozirgi ob-havo
        </h2>
        <CitySearch onSearch={onSearch} className="mb-4 max-w-lg w-full" />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && <WeatherCard data={data} />}
      </div>
    </main>
  );
};
