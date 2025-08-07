import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CitySearch } from "./CitySearch";

describe("CitySearch", () => {
  it("to'g'ri shahar nomi kiritilganda onSearch funksiyasini chaqirishi kerak", () => {
    const onSearchMock = vi.fn();

    render(<CitySearch onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText(
      "Shahar nomini kiriting..."
    );

    fireEvent.change(inputElement, { target: { value: "Toshkent" } });

    const searchButton = screen.getByRole("button", { name: "Qidirish" });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("Toshkent");
    expect(
      screen.queryByText(/Ob-havo haqida ma'lumot/i)
    ).not.toBeInTheDocument();
  });

  it("bo'sh shahar nomi kiritilganda xatolik xabarini ko'rsatishi kerak", () => {
    const onSearchMock = vi.fn();
    render(<CitySearch onSearch={onSearchMock} />);

    const searchButton = screen.getByRole("button", { name: "Qidirish" });
    fireEvent.click(searchButton);

    expect(onSearchMock).not.toHaveBeenCalled();
    expect(
      screen.getByText(
        "Ob-havo haqida ma'lumot olish uchun shahar nomini kiritishingiz kerak!"
      )
    ).toBeInTheDocument();
  });

  it("inputga yozilganda xatolik matnini tozalashi kerak", () => {
    const onSearchMock = vi.fn();
    render(<CitySearch onSearch={onSearchMock} />);

    const searchButton = screen.getByRole("button", { name: "Qidirish" });
    fireEvent.click(searchButton);
    expect(
      screen.getByText(
        "Ob-havo haqida ma'lumot olish uchun shahar nomini kiritishingiz kerak!"
      )
    ).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(
      "Shahar nomini kiriting..."
    );
    fireEvent.change(inputElement, { target: { value: "Toshkent" } });

    expect(
      screen.queryByText(/Ob-havo haqida ma'lumot/i)
    ).not.toBeInTheDocument();
  });
});
