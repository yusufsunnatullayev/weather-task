import { useState } from "react";
import { Button, Input } from "@shared/ui";

export const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setErrorText(
        "Ob-havo haqida ma'lumot olish uchun shahar nomini kiritishingiz kerak!"
      );
      return;
    }
    onSearch(city.trim());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex flex-col gap-2 bg-transparent"
    >
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Shahar nomini kiriting..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setErrorText("");
          }}
        />
        <Button className="cursor-pointer" type="submit">
          Qidirish
        </Button>
      </div>
      <span className="text-xs md:text-sm text-red-500">{errorText}</span>
    </form>
  );
};
