import { useQuery } from "react-query";
import { requestAllToppings } from "../services/toppings";

export const useToppingQuery = (select) =>
	useQuery(["fetchToppings"], requestAllToppings, { select });

export const useExtraToppings = (type) =>
	useToppingQuery((data) =>
		data.filter((topping) => topping.toppingType === type),
	);
