import { useState } from "react";
import { Button, Card, Input } from "@shared/ui";
import { ThemeSwitcher } from "@features/theme-switcher";
import useWeatherStore from "@shared/store/weatherStore";

export const SettingsPage = () => {
  const onSetDefaultCity = useWeatherStore((state) => state.setDefaultCity);
  const [inputCity, setInputCity] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      localStorage.setItem("defaultCity", inputCity.trim());
      onSetDefaultCity(inputCity.trim());
      alert("Asosiy shahar muvaffaqiyatli saqlandi!");
      setInputCity("");
    }
  };

  return (
    <main className="w-full flex-1 px-4 pt-20 flex flex-col items-center z-10">
      <h2
        className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        aria-label="Sozlamalar sahifasi"
      >
        Sozlamalar
      </h2>
      <Card className="w-full max-w-md space-y-4 items-start">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-base md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Yorug' / Qorong'i rejim
          </h3>
          <ThemeSwitcher />
        </div>
        <div className="w-full">
          <h3 className="text-base md:text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Asosiy shaharni o'rnatish
          </h3>
          <form onSubmit={handleSave} className="w-full flex gap-2">
            <Input
              type="text"
              placeholder="Asosiy shahar nomi..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <Button type="submit" className="cursor-pointer">
              Saqlash
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
};
