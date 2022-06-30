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
} from '@chakra-ui/react';
import { Field } from 'formik';
import { retrieveItemPrice, plusPriceFormatter } from '../../../utils/helper';
import { useExtraToppings } from '../../../hooks/useTopping';
import { useComboSecondHalfPizza } from '../../../hooks/useDish';
import { useStandardPizza } from '../../../hooks/useDish';
import { SoftDrink, CannedDrink, PizzaBase } from '../../../configs/constants';

const newPizzaBase = PizzaBase.filter(
	(item) => item.name != 'gluten free (small size only)'
);

const PizzaCombo2 = ({ name, values }) => {
	const { data: pizzaExtraToppings } = useExtraToppings('pizza');
	const { data: secondHalfPizzaOptions } = useComboSecondHalfPizza(name);
	const { data: standardPizzas } = useStandardPizza(name);
	const selectedSize = values?.size || 'small';
	const combos = ['Combo 1', 'Combo 2', 'Combo 3'];
	const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;
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
					<Field name="pizzaCombo2" value={values.pizzaCombo2}>
						{({ field }) => {
							const { onChange, ...rest } = field;
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="pizzaCombo2">
										<VStack align="start" pl="2" gap={2}>
											{standardPizzas?.map((name, index) => {
												if (name !== 'No Second half pizza') {
													return (
														<Radio
															key={index}
															value={name}
															size="lg"
															name="pizzaCombo2"
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
					<Field name="baseCombo2">
						{({ field }) => {
							const { onChange, ...rest } = field;
							if (rest.value.trim()) {
								if (values.baseCombo2 === 'normal crust') {
									values.basePriceCombo2 = 0;
								} else {
									values.basePriceCombo2 = 1;
								}
							}
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="baseCombo2">
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
														{name !== 'normal crust' && (
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
			{values.pizzaCombo2 && (
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
						<Field name="extraToppingsCombo2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.extraToppingsPricesCombo2 = toppings.map(
									(toppingName) => {
										const pizzaExtraTopping = pizzaExtraToppings.filter(
											(topping) => topping.toppingName === toppingName
										)[0];
										// if (values.secondHalfPizzaCombo2) {
										// 	const price =
										// 		retrieveItemPrice(pizzaExtraTopping.prices, "large") /
										// 		2;
										// 	return price;
										// } else {
										const price = retrieveItemPrice(
											pizzaExtraTopping.prices,
											'large'
										);
										return price;
										// }
									}
								);

								return (
									<FormControl>
										<CheckboxGroup {...rest} id="extraToppingsCombo2">
											<VStack align="start" pl="2" gap={2}>
												{pizzaExtraToppings?.map(
													({ toppingName, prices }, index) => {
														const itemPrice = retrieveItemPrice(
															prices,
															'large'
														);
														return (
															<Checkbox
																key={index}
																value={toppingName}
																size="lg"
																name="extraToppingsCombo2"
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
																			{values?.secondHalfPizzaCombo2[0]
																				? plusPriceFormatter(itemPrice / 2)
																				: plusPriceFormatter(itemPrice)}
																		</Text>
																	)}
																</Flex>
															</Checkbox>
														);
													}
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
			{values.pizzaCombo2 && (
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
						<Field name="secondHalfPizzaCombo2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (values.secondHalfPizzaCombo2) {
									values.secondHalfPriceCombo2 = 1;
								}
								if (values.secondHalfPizzaCombo2.length === 0) {
									values.secondHalfPriceCombo2 = 0;
									values.secondHalfPizzaExtraToppingsCombo2 = '';
									values.secondHalfPizzaExtraToppingsPricesCombo2 = [];
								}

								return (
									<FormControl>
										<RadioGroup {...rest} id="secondHalfPizzaCombo2">
											<VStack align="start" pl="2" gap={2}>
												{secondHalfPizzaOptions?.map(({ name }, index) => {
													if (name !== 'No Second half pizza') {
														return (
															<Checkbox
																key={index}
																value={name}
																size="lg"
																name="secondHalfPizzaCombo2"
																onChange={onChange}
																isDisabled={
																	values?.secondHalfPizzaCombo2[0] &&
																	values?.secondHalfPizzaCombo2[0] !== name
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
			{values?.secondHalfPizzaCombo2[0] && (
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
						<Field name="secondHalfPizzaExtraToppingsCombo2">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.secondHalfPizzaExtraToppingsPricesCombo2 = toppings.map(
									(toppingName) => {
										const pizzaExtraTopping = pizzaExtraToppings.filter(
											(topping) => topping.toppingName === toppingName
										)[0];
										const price =
											retrieveItemPrice(pizzaExtraTopping.prices, 'large') / 2;
										return price;
									}
								);

								return (
									<FormControl>
										<CheckboxGroup
											{...rest}
											id="secondHalfPizzaExtraToppingsCombo2"
										>
											<VStack align="start" pl="2" gap={2}>
												{pizzaExtraToppings?.map(
													({ toppingName, prices }, index) => {
														const itemPrice =
															retrieveItemPrice(prices, 'large') / 2;
														return (
															<Checkbox
																key={index}
																value={toppingName}
																size="lg"
																name="secondHalfPizzaExtraToppingsCombo2"
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
													}
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

export default PizzaCombo2;
