import axios from "axios";
import { API_KEY, BASE_URL } from "../config/constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchCurrentWeather = async (city) => {
  if (!city) throw new Error("Shahar nomi kiritilmagan.");
  if (!API_KEY)
    throw new Error("API kaliti oʻrnatilmagan. Iltimos, API_KEY ni qoʻshing.");
  const { data } = await apiClient.get("/weather", {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "uz",
    },
  });
  return data;
};

export const fetchForecast = async (city) => {
  if (!city) throw new Error("Shahar nomi kiritilmagan.");
  if (!API_KEY)
    throw new Error("API kaliti oʻrnatilmagan. Iltimos, API_KEY ni qoʻshing.");
  const { data } = await apiClient.get("/forecast", {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "uz",
    },
  });
  const dailyForecasts = data.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5);
  return dailyForecasts;
};
