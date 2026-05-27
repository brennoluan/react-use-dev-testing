export const formatPrice = (price: number) => {
  return price
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace(/\s/g, "");
};

const toValidNonNegativePrice = (price: unknown): number => {
  const parsed =
    typeof price === "number"
      ? price
      : typeof price === "string"
        ? Number(price)
        : Number.NaN;

  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
};

export const calculateTotalPrice = (
  products: { id: number; price: number }[],
) => {
  return products.reduce((acc, product) => {
    return acc + toValidNonNegativePrice(product.price);
  }, 0);
};

export const calculateTotalPriceWithDiscount = (
  products: { id: number; price: number }[],
  discount: number,
) => {
  if (
    typeof discount !== "number" ||
    !Number.isFinite(discount) ||
    discount < 0
  )
    return calculateTotalPrice(products);

  if (discount >= 100) return 0;

  const total = calculateTotalPrice(products);
  return total * (1 - discount / 100);
};
