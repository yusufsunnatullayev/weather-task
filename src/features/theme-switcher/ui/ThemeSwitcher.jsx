import { Button } from "@shared/ui";
import useThemeStore from "@shared/store/themeStore";

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} className="px-4 py-2 cursor-pointer">
      {theme === "light" ? "Qorong'i" : "Yorug'"} rejim
    </Button>
  );
};
