import { get } from "../utils/axios.js";

export const requestAllDishes = () => {
  const url = "/dishes/available";

  return get(url).then((response) => response.data);
};
