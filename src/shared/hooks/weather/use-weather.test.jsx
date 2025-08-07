import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { useCurrentWeather, useForecast } from "./use-weather";

const { fetchCurrentWeather, fetchForecast } = vi.hoisted(() => {
  const fetchCurrentWeather = vi.fn();
  const fetchForecast = vi.fn();
  return { fetchCurrentWeather, fetchForecast };
});

vi.mock("../../api/weather", () => ({
  fetchCurrentWeather,
  fetchForecast,
}));

afterEach(() => {
  vi.clearAllMocks();
});

const TestComponent = ({ hook, city, enabled }) => {
  const result = hook(city, enabled);
  if (result.isLoading) {
    return <div data-testid="status">loading</div>;
  }
  if (result.isError) {
    return <div data-testid="error">{result.error.message}</div>;
  }
  if (result.isSuccess) {
    return <div data-testid="data">{JSON.stringify(result.data)}</div>;
  }
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Weather Hooks", () => {
  it("useCurrentWeather to'g'ri ma'lumotni olib kelishi kerak", async () => {
    const mockData = {
      name: "Toshkent",
      main: { temp: 25 },
      weather: [{ description: "ochiq osmon" }],
    };
    fetchCurrentWeather.mockResolvedValue(mockData);

    renderWithClient(
      <TestComponent hook={useCurrentWeather} city="Toshkent" enabled={true} />
    );

    await waitFor(() =>
      expect(screen.getByTestId("data").textContent).toBe(
        JSON.stringify(mockData)
      )
    );
    expect(fetchCurrentWeather).toHaveBeenCalledTimes(1);
    expect(fetchCurrentWeather).toHaveBeenCalledWith("Toshkent");
  });

  it("useForecast to'g'ri ma'lumotni olib kelishi kerak", async () => {
    const mockData = {
      list: [
        {
          dt_txt: "2025-08-07",
          main: { temp: 20 },
          weather: [{ description: "bulutli" }],
        },
      ],
    };
    fetchForecast.mockResolvedValue(mockData);

    renderWithClient(
      <TestComponent hook={useForecast} city="Toshkent" enabled={true} />
    );

    await waitFor(() =>
      expect(screen.getByTestId("data").textContent).toBe(
        JSON.stringify(mockData)
      )
    );
    expect(fetchForecast).toHaveBeenCalledTimes(1);
    expect(fetchForecast).toHaveBeenCalledWith("Toshkent");
  });

  it("'enabled' false bo'lsa, hook hech narsani chaqirmasligi kerak", async () => {
    renderWithClient(
      <TestComponent hook={useCurrentWeather} city="Toshkent" enabled={false} />
    );

    await new Promise((r) => setTimeout(r, 100));

    expect(fetchCurrentWeather).not.toHaveBeenCalled();
  });
});
