import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ForecastDayCard } from "./ForecastDayCard";

vi.mock("../../../shared/lib/utils", () => ({
  capitalizeFirstLetter: vi.fn(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  ),
  getDayName: vi.fn(() => "Payshanba"),
  getForecastDate: vi.fn(() => "May 20"),
}));

describe("ForecastDayCard", () => {
  it("ob-havo prognoz ma'lumotlarini to'g'ri ko'rsatishi kerak", () => {
    const mockData = {
      dt_txt: "2025-08-07 12:00:00",
      main: {
        temp: 15.67,
        feels_like: 14.5,
        temp_min: 15.67,
        temp_max: 15.67,
        pressure: 1014,
        humidity: 68,
      },
      weather: [
        { id: 804, main: "Clouds", description: "bulutli", icon: "04d" },
      ],
      wind: { speed: 4.8, deg: 236, gust: 9.38 },
      clouds: { all: 99 },
    };

    render(<ForecastDayCard data={mockData} />);

    expect(screen.getByText("Payshanba")).toBeInTheDocument();
    expect(screen.getByText("May 20")).toBeInTheDocument();
    expect(screen.getByText("16°C")).toBeInTheDocument();
    expect(screen.getByText("Bulutli")).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "bulutli" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "bulutli" })).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/04d@2x.png"
    );
  });

  it("ma'lumotlar yo'q bo'lsa, hech narsa ko'rsatmasligi kerak", () => {
    const { container } = render(<ForecastDayCard data={null} />);
    expect(container.firstChild).toBeNull();
  });
});
