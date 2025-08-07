import { ForecastPage } from "@pages/Forecast";
import { HomePage } from "@pages/Home";
import { SettingsPage } from "@pages/Settings";

export const routes = [
  {
    id: 1,
    title: "Asosiy",
    element: HomePage,
    path: "/",
  },
  {
    id: 2,
    title: "Prognoz",
    element: ForecastPage,
    path: "/forecast",
  },
  {
    id: 3,
    title: "Sozlamalar",
    element: SettingsPage,
    path: "/settings",
  },
];
