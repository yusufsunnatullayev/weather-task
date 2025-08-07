import { Card } from "@shared/ui";
import { capitalizeFirstLetter } from "@shared/lib/utils";

export const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const description = weather[0]?.description;
  const icon = weather[0]?.icon;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const windSpeed = (wind.speed * 3.6).toFixed(1);

  return (
    <Card className="w-full">
      <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        {name}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
        className="w-32 h-32"
      />
      <p className="text-6xl font-extrabold text-primary">{temp}°C</p>
      <p className="text-xl font-medium text-gray-800 dark:text-gray-300">
        {capitalizeFirstLetter(description)}
      </p>
      <div className="mt-4 text-gray-700 dark:text-gray-400">
        <p>His qilinadi: {feelsLike}°C</p>
        <p>Shamol: {windSpeed} km/h</p>
      </div>
    </Card>
  );
};
