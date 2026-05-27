import { formatPrice } from "./index";

describe("Testando funcoes utilitarias do projeto", () => {
  test("deve formatar o preço corretamente", () => {
    expect(formatPrice(10)).toBe("R$10,00");
  });
});
