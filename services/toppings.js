import { get } from "../utils/axios.js";

export const requestAllToppings = () => {
  const url = "/toppings";

  return get(url).then((response) => response.data);
};
