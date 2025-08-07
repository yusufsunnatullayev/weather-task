import { render, screen } from "@testing-library/react";
import { WeatherCard } from "./WeatherCard";
import { describe, expect, it } from "vitest";

describe("WeatherCard", () => {
  it("ob-havo ma'lumotlarini to'g'ri ko'rsatishi kerak", () => {
    const mockData = {
      name: "Toshkent",
      main: { temp: 25, feels_like: 23 },
      weather: [{ description: "ochiq osmon", icon: "01d" }],
      wind: { speed: 5 },
    };

    render(<WeatherCard data={mockData} />);

    expect(screen.getByText("Toshkent")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("Ochiq osmon")).toBeInTheDocument();
    expect(screen.getByText("His qilinadi: 23°C")).toBeInTheDocument();
    expect(screen.getByText("Shamol: 18.0 km/h")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "ochiq osmon" })
    ).toBeInTheDocument();
  });

  it("ma'lumotlar yo'q bo'lsa, hech narsa ko'rsatmasligi kerak", () => {
    const { container } = render(<WeatherCard data={null} />);
    expect(container.firstChild).toBeNull();
  });
});
