import { render, screen } from "@testing-library/react";
import Header from "./Header";

// FIXME: teste não está funcionando, precisa de configuração
describe("Header", () => {
  test("deve renderizar o componente", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
