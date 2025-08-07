import { create } from "zustand";

const useWeatherStore = create((set) => ({
  city: localStorage.getItem("defaultCity") || "",

  setCity: (newCity) => set({ city: newCity }),

  setDefaultCity: (newCity) => {
    set({ city: newCity });
    localStorage.setItem("defaultCity", newCity);
  },
}));

export default useWeatherStore;
