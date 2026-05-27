import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Header", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    mockNavigate.mockClear();
  });

  afterAll(() => {
    mockNavigate.mockReset();
  });

  test("deve renderizar o componente", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  test("deve disparar função ao clicar no logo", () => {
    const logo = screen.getByAltText("logo");
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).not.toHaveBeenCalledWith("/cart");
  });
  test("deve disparar função ao clicar no cart", () => {
    const cart = screen.getByAltText("cart");
    fireEvent.click(cart);
    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
