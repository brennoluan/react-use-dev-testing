import { act } from "react";
import { ContextProvider, useCart } from "../../../context";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Wrapper } from "../../../routes/helpers";
import { mockFetch } from "../../../test-utils/mockFetch";
import Cart from "..";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const CartItemStub = () => {
  const { addItem } = useCart();
  const addTestItem = () => {
    addItem({
      id: 1,
      name: "Teste Item",
      price: 100,
      quantity: 1,
      image: "teste-image.jpg",
      description: "teste-description",
      category: 1,
      colors: ["preto"],
      sizes: ["M"],
    });
  };

  return (
    <button onClick={addTestItem} data-testid="add-item">
      Adicionar Item
    </button>
  );
};

const renderCart = async () => {
  const result = await act(async () => {
    const { container } = render(
      <BrowserRouter>
        <ContextProvider>
          <Wrapper>
            <CartItemStub />
            <Cart />
          </Wrapper>
        </ContextProvider>
      </BrowserRouter>,
    );
    return container;
  });
  return result;
};

describe("Cart", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockNavigate.mockClear();
  });

  test("deve renderizar o componente de carrinho vazio caso não exista nenhum item na lista", async () => {
    await renderCart();

    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();

    const continueShoppingButton = screen.getByText("Continuar comprando");
    fireEvent.click(continueShoppingButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
  test("deve mostrar o item adicionado ao carrinho", async () => {
    await renderCart();

    const addItemButton = screen.getByTestId("add-item");
    await act(async () => {
      fireEvent.click(addItemButton);
    });

    expect(screen.getByText("Teste Item")).toBeInTheDocument();

    const incrementButton = screen.getByRole("button", { name: "+" });
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(screen.getByText("2")).toBeInTheDocument();

    const decrementButton = screen.getByRole("button", { name: "-" });
    await act(async () => {
      fireEvent.click(decrementButton);
    });

    expect(screen.getByText("1")).toBeInTheDocument();

    const removeButton = screen.getByAltText("trash");
    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(screen.queryByText("Teste Item")).not.toBeInTheDocument();
  });
  test("deve finalizar o pedido", async () => {
    await renderCart();

    const addItemButton = screen.getByTestId("add-item");
    await act(async () => {
      fireEvent.click(addItemButton);
    });

    const checkoutButton = screen.getByText("Finalizar pedido");
    await act(async () => {
      fireEvent.click(checkoutButton);
    });

    expect(screen.getByText("Processando...")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText("Pedido Realizado!")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(
      screen.getByText("Seu pedido foi processado com sucesso"),
    ).toBeInTheDocument();

    const returnButton = screen.getByText("Voltar para a loja");
    await act(async () => {
      fireEvent.click(returnButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
