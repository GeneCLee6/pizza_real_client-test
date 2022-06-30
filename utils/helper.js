import { PizzaSize } from "../configs/constants";

export const priceFormatter = (price) => {
  const result = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(price);
  return result;
};

export const plusPriceFormatter = (price) => `+${priceFormatter(price)}0`;

export const retrieveItemPrice = (prices, size) => {
  if (!size) return prices[0];
  switch (size) {
    case PizzaSize[0]:
      return prices[0];

    case PizzaSize[1]:
      return prices[1];

    case PizzaSize[2]:
      return prices[2];

    default:
      throw new Error("Invalid price");
  }
};
