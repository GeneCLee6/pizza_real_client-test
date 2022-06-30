export const PizzaSize = ["small", "large", "family"];

export const PizzaBase = [
	{
		name: "normal crust",
		price: 0,
	},
	{
		name: "thin pan",
		price: 1.0,
	},
	{
		name: "deep pan",
		price: 1.0,
	},
];

export const PizzaSpecialToppings = [
	{
		name: "chicken",
		price: 1,
	},
	{
		name: "prawn",
		price: 1,
	},
	{
		name: "velletta",
		price: 1,
	},
];

export const PastaChoice = [
	"Fettuccine",
	"Spaghetti",
	"Penne",
	"Gnocchi",
	"Ravioli",
	"Spinach Ravioli",
];

export const SoftDrink = [
	"Coke",
	"Coke No Sugar",
	"Diet Coke",
	"Coke Vanilla",
	"Coke Vanilla No Sugar",
	"Lift",
	"Sprite",
	"Fanta",
];

export const SpecialStandardPizza = [
	"Cheese Pizza",
	"Garlic Pizza",
	"Pesto Pizza",
	"Tropical",
	"Aussie",
	"Zingara",
];

export const CannedDrink = ["Coke", "Sprite", "Fanta"];

export const DeliveryPostCodes = ["7015", "7018", "7019"];

export const DeliveryFees = [
	{
		suburbs: ["Bellerive"],
		minOrderCost: 15,
		deliverFee: 4,
	},
	{
		suburbs: ["Rosny", "Rosny Park", "Montagu Bay", "Warrane", "Rose Bay"],
		minOrderCost: 16,
		deliverFee: 5,
	},
	{
		suburbs: ["Mornington", "Lindisfarne", "Howrah", "Rokeby"],
		minOrderCost: 19,
		deliverFee: 6,
	},
	{
		suburbs: ["Tranmere", "Clarendon Vale", "Oakdowns", "Geilston Bay"],
		minOrderCost: 21,
		deliverFee: 7,
	},
];

export const OpeningHours = [
	{
		week: 7,
		mode12: ["05：00 PM", "08：30 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 20,
				minute: 30,
			},
		],
	},
	{
		week: 1,
		mode12: ["05：00 PM", "08：30 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 20,
				minute: 30,
			},
		],
	},
	{
		week: 2,
		mode12: ["05：00 PM", "08：30 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 20,
				minute: 30,
			},
		],
	},
	{
		week: 3,
		mode12: ["05：00 PM", "09：00 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 21,
				minute: 0,
			},
		],
	},
	{
		week: 4,
		mode12: ["05：00 PM", "09：00 PM"],
		mode24: [
			{
				hour: 10,
				minute: 0,
			},
			{
				hour: 21,
				minute: 0,
			},
		],
	},
	{
		week: 5,
		mode12: ["05：00 PM", "10：00 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 22,
				minute: 0,
			},
		],
	},
	{
		week: 6,
		mode12: ["05：00 PM", "10：00 PM"],
		mode24: [
			{
				hour: 17,
				minute: 0,
			},
			{
				hour: 22,
				minute: 0,
			},
		],
	},
];
