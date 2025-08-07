import { useEffect } from "react";
import useThemeStore from "@shared/store/themeStore";
import useWeatherStore from "@shared/store/weatherStore";
import AppRouter from "./routers/AppRouter";
import heroBg from "@shared/assets/images/hero-bg.jpg";
import { Header } from "@widgets/header";

const App = () => {
  const city = useWeatherStore((state) => state.city);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className="h-screen flex flex-col bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="w-full h-screen fixed top-0 left-0 dark:bg-gray-900/80"></div>
      <Header />
      <AppRouter />
      <div className="fixed bottom-4 right-4 bg-slate-600/20 backdrop-blur-md py-2 px-4 rounded-3xl">
        <p className="text-sm text-white">
          Joriy shahar:{" "}
          <span className="font-semibold text-primary">
            {city || "aniqlanmagan"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
