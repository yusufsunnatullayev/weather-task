import { fetchCurrentWeather, fetchForecast } from "../../api/weather";
import { useQuery } from "@tanstack/react-query";

export const useCurrentWeather = (city, enabled) => {
  return useQuery({
    queryKey: ["currentWeather", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: !!city && enabled,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useForecast = (city, enabled) => {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecast(city),
    enabled: !!city && enabled,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
};
