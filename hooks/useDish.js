import { useQuery } from "react-query";
import { requestAllDishes } from "../services/dishes";

export const useDishQuery = (select) =>
	useQuery(["fetchDish"], requestAllDishes, { select });

// export const useDrinkItem = (type) =>
//   useDishQuery((data) => data.filter((dish) => dish.subCategory === type));

export const useMenu = () =>
	useDishQuery((data) => {
		const map = {};
		const menu = [];
		data.map((i) => {
			const { category } = i;

			if (!map[category]) {
				menu.push({
					category,
					menuItems: [i],
				});

				map[category] = i;
			} else {
				menu.map((j) => {
					if (j.category === category) {
						j.menuItems.push(i);
					}
				});
			}
		});
		return menu;
	});

export const useSecondHalfPizza = (firstPizzaName) =>
	useDishQuery((data) =>
		data.filter(
			({ dishType, name }) =>
				(dishType === "pizza" || dishType === "gourmet") &&
				name !== firstPizzaName,
		),
	);

export const useComboSecondHalfPizza = (firstPizzaName) =>
	useDishQuery((data) =>
		data.filter(
			({ dishType, name }) => dishType === "pizza" && name !== firstPizzaName,
		),
	);

export const useStandardPizza = () =>
	// useDishQuery((data) =>
	//   data.filter(
	//     ({ dishType, name }) => dishType === "pizza" && name !== firstPizzaName
	//   )
	// );
	useDishQuery((data) => {
		const standPizzaArray = data.filter(
			(dish) => dish.category === "Standard Pizza",
		);
		let standPizzaNameArray = [];
		standPizzaArray.forEach((element) => {
			standPizzaNameArray.push(element.name);
		});
		return standPizzaNameArray;
	});
