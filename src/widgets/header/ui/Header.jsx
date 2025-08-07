import { Link, useLocation } from "react-router-dom";
import { routes } from "@app/routers/routes";

export const Header = () => {
  const location = useLocation();
  return (
    <nav className="mx-auto mt-10 flex justify-between items-center py-3 px-7 md:px-10 z-10 rounded-3xl bg-white/10 backdrop-blur-md">
      <div className="flex gap-8 md:gap-16">
        {routes.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`text-sm md:text-base font-normal hover:text-primary duration-150 ${
              location.pathname === item.path
                ? "text-primary"
                : "text-black dark:text-white"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};
