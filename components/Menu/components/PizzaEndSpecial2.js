import {
	Box,
	Text,
	RadioGroup,
	CheckboxGroup,
	Checkbox,
	VStack,
	Radio,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	FormControl,
	Flex,
} from "@chakra-ui/react";
import { Field } from "formik";
import { retrieveItemPrice, plusPriceFormatter } from "../../../utils/helper";
import { useExtraToppings } from "../../../hooks/useTopping";
import { useComboSecondHalfPizza } from "../../../hooks/useDish";
import { useStandardPizza } from "../../../hooks/useDish";
import { SoftDrink, CannedDrink, PizzaBase } from "../../../configs/constants";

const newPizzaBase = PizzaBase.filter(
	(item) => item.name != "gluten free (small size only)",
);

const PizzaEndSpecial2 = ({ name, values }) => {
	const { data: pizzaExtraToppings } = useExtraToppings("pizza");
	const { data: secondHalfPizzaOptions } = useComboSecondHalfPizza(name);
	const { data: standardPizzas } = useStandardPizza(name);
	//	const selectedSize = values?.size || 'small';
	//	const combos = ['Combo 1', 'Combo 2', 'Combo 3'];
	//	const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;
	return (
		<>
			{/* Pizza Selection*/}
			<AccordionItem>
				<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
					<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="2">
						Pizza Chioce 2
						<Text fontSize="xs" color="grey">
							Choose up to 1
						</Text>
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<Field name="pizzaEndSpecial2" value={values.pizzaEndSpecial2}>
						{({ field }) => {
							const { onChange, ...rest } = field;
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="pizzaEndSpecial2">
										<VStack align="start" pl="2" gap={2}>
											{standardPizzas?.map((name, index) => {
												if (name !== "No Second half pizza") {
													return (
														<Radio
															key={index}
															value={name}
															size="lg"
															name="pizzaEndSpecial2"
															onChange={onChange}
														>
															<Flex width="100%" justifyContent="space-between">
																<Text
																	fontWeight="600"
																	fontSize="15px"
																	textTransform="capitalize"
																>
																	{name}
																</Text>
															</Flex>
														</Radio>
													);
												}
											})}
										</VStack>
									</RadioGroup>
								</FormControl>
							);
						}}
					</Field>
				</AccordionPanel>
			</AccordionItem>
			{/* Base Selection*/}
			<AccordionItem>
				<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
					<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="2">
						Choice of Base
						<Text fontSize="xs" color="grey">
							Choose Up to 1
						</Text>
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<Field name="baseEndSpecial2">
						{({ field }) => {
							const { onChange, ...rest } = field;
							if (rest.value.trim()) {
								if (values.baseEndSpecial2 === "normal crust") {
									values.basePriceEndSpecial2 = 0;
									console.log("here1");
								} else {
									values.basePriceEndSpecial2 = 1;
									console.log("here2");
								}
							}
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="baseEndSpecial2">
										<VStack align="start" pl="2" gap={2}>
											{newPizzaBase.map(({ name }) => (
												<Radio
													key={name}
													value={name}
													size="lg"
													onChange={onChange}
												>
													<Flex>
														<Text
															fontWeight="600"
															fontSize="15px"
															textTransform="capitalize"
														>
															{name}
														</Text>
														{name !== "normal crust" && (
															<Text fontWeight="600" fontSize="15px" ml={4}>
																{plusPriceFormatter(1)}
															</Text>
														)}
													</Flex>
												</Radio>
											))}
										</VStack>
									</RadioGroup>
								</FormControl>
							);
						}}
					</Field>
				</AccordionPanel>
			</AccordionItem>
			{/* Extra Topping Selection*/}
			{values.pizzaEndSpecial2 && (
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Extra Toppings
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="extraToppingsEndSpecial2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.extraToppingsPricesEndSpecial2 = toppings.map(
									(toppingName) => {
										const pizzaExtraTopping = pizzaExtraToppings.filter(
											(topping) => topping.toppingName === toppingName,
										)[0];

										let price = 0;
										if (name === "Friday & Saturday Special 3") {
											price = retrieveItemPrice(
												pizzaExtraTopping.prices,
												"family",
											);
										} else {
											price = retrieveItemPrice(
												pizzaExtraTopping.prices,
												"large",
											);
										}
										return price;
									},
								);

								return (
									<FormControl>
										<CheckboxGroup {...rest} id="extraToppingsEndSpecial2">
											<VStack align="start" pl="2" gap={2}>
												{pizzaExtraToppings?.map(
													({ toppingName, prices }, index) => {
														let itemPrice = 0;
														if (name === "Friday & Saturday Special 3") {
															itemPrice = retrieveItemPrice(prices, "family");
														} else {
															itemPrice = retrieveItemPrice(prices, "large");
														}
														return (
															<Checkbox
																key={index}
																value={toppingName}
																size="lg"
																name="extraToppingsEndSpecial2"
																onChange={onChange}
															>
																<Flex>
																	<Text
																		fontWeight="600"
																		fontSize="15px"
																		textTransform="capitalize"
																	>
																		{toppingName}
																	</Text>
																	{!!itemPrice && (
																		<Text
																			fontWeight="600"
																			fontSize="15px"
																			ml={4}
																		>
																			{values?.secondHalfPizzaEndSpecial2[0]
																				? plusPriceFormatter(itemPrice / 2)
																				: plusPriceFormatter(itemPrice)}
																		</Text>
																	)}
																</Flex>
															</Checkbox>
														);
													},
												)}
											</VStack>
										</CheckboxGroup>
									</FormControl>
								);
							}}
						</Field>
					</AccordionPanel>
				</AccordionItem>
			)}

			{/* Second Half Selection */}
			{values.pizzaEndSpecial2 && (
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Choice of Second Half
							<Text fontSize="xs" color="grey">
								$1.0 extra
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="secondHalfPizzaEndSpecial2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (values.secondHalfPizzaEndSpecial2) {
									values.secondHalfPriceEndSpecial2 = 1;
								}
								if (values.secondHalfPizzaEndSpecial2.length === 0) {
									values.secondHalfPriceEndSpecial2 = 0;
									values.secondHalfPizzaExtraToppingsEndSpecial2 = "";
									values.secondHalfPizzaExtraToppingsPricesEndSpecial2 = [];
								}

								return (
									<FormControl>
										<RadioGroup {...rest} id="secondHalfPizzaEndSpecial2">
											<VStack align="start" pl="2" gap={2}>
												{secondHalfPizzaOptions?.map(({ name }, index) => {
													if (name !== "No Second half pizza") {
														return (
															<Checkbox
																key={index}
																value={name}
																size="lg"
																name="secondHalfPizzaEndSpecial2"
																onChange={onChange}
																isDisabled={
																	values?.secondHalfPizzaEndSpecial2[0] &&
																	values?.secondHalfPizzaEndSpecial2[0] !== name
																}
															>
																<Flex
																	width="100%"
																	justifyContent="space-between"
																>
																	<Text
																		fontWeight="600"
																		fontSize="15px"
																		textTransform="capitalize"
																	>
																		{name}
																	</Text>
																</Flex>
															</Checkbox>
														);
													}
												})}
											</VStack>
										</RadioGroup>
									</FormControl>
								);
							}}
						</Field>
					</AccordionPanel>
				</AccordionItem>
			)}

			{/* Extra Topping Selection*/}
			{values?.secondHalfPizzaEndSpecial2[0] && (
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Second Half Extra Toppings Pizza 2
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="secondHalfPizzaExtraToppingsEndSpecial2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.secondHalfPizzaExtraToppingsPricesEndSpecial2 =
									toppings.map((toppingName) => {
										const pizzaExtraTopping = pizzaExtraToppings.filter(
											(topping) => topping.toppingName === toppingName,
										)[0];
										let price = 0;
										if (name === "Friday & Saturday Special 3") {
											price =
												retrieveItemPrice(pizzaExtraTopping.prices, "family") /
												2;
										} else {
											price =
												retrieveItemPrice(pizzaExtraTopping.prices, "large") /
												2;
										}

										return price;
									});

								return (
									<FormControl>
										<CheckboxGroup
											{...rest}
											id="secondHalfPizzaExtraToppingsEndSpecial2"
										>
											<VStack align="start" pl="2" gap={2}>
												{pizzaExtraToppings?.map(
													({ toppingName, prices }, index) => {
														let itemPrice = 0;
														if (name === "Friday & Saturday Special 3") {
															itemPrice =
																retrieveItemPrice(prices, "family") / 2;
														} else {
															itemPrice =
																retrieveItemPrice(prices, "large") / 2;
														}
														return (
															<Checkbox
																key={index}
																value={toppingName}
																size="lg"
																name="secondHalfPizzaExtraToppingsEndSpecial2"
																onChange={onChange}
															>
																<Flex>
																	<Text
																		fontWeight="600"
																		fontSize="15px"
																		textTransform="capitalize"
																	>
																		{toppingName}
																	</Text>
																	{!!itemPrice && (
																		<Text
																			fontWeight="600"
																			fontSize="15px"
																			ml={4}
																		>
																			{plusPriceFormatter(itemPrice)}
																		</Text>
																	)}
																</Flex>
															</Checkbox>
														);
													},
												)}
											</VStack>
										</CheckboxGroup>
									</FormControl>
								);
							}}
						</Field>
					</AccordionPanel>
				</AccordionItem>
			)}
		</>
	);
};

export default PizzaEndSpecial2;
