import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((item) => (
        <Route path={item.path} element={<item.element />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
