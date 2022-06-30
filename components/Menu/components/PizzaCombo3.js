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

const PizzaCombo3 = ({ name, values }) => {
	const { data: pizzaExtraToppings } = useExtraToppings('pizza');
	const { data: secondHalfPizzaOptions } = useComboSecondHalfPizza(name);
	const { data: standardPizzas } = useStandardPizza(name);
	const selectedSize = values?.size || 'small';
	const combos = ['Combo 1', 'Combo 2', 'Combo 3'];
	const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;
	const newPizzaBase = PizzaBase.filter(
		(item) => item.name != 'gluten free (small size only)'
	);
	return (
		<>
			{/* Pizza Selection*/}
			<AccordionItem>
				<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
					<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="2">
						Pizza Chioce 3
						<Text fontSize="xs" color="grey">
							Choose up to 1
						</Text>
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<Field name="pizzaCombo3" value={values.pizzaCombo3}>
						{({ field }) => {
							const { onChange, ...rest } = field;
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="pizzaCombo3">
										<VStack align="start" pl="2" gap={2}>
											{standardPizzas?.map((name, index) => {
												if (name !== 'No Second half pizza') {
													return (
														<Radio
															key={index}
															value={name}
															size="lg"
															name="pizzaCombo3"
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
					<Field name="baseCombo3">
						{({ field }) => {
							const { onChange, ...rest } = field;
							if (rest.value.trim()) {
								if (values.baseCombo3 === 'normal crust') {
									values.basePriceCombo3 = 0;
								} else {
									values.basePriceCombo3 = 1;
								}
							}
							return (
								<FormControl isRequired>
									<RadioGroup {...rest} id="baseCombo3">
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
			{values.pizzaCombo3 && (
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
						<Field name="extraToppingsCombo3">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.extraToppingsPricesCombo3 = toppings.map(
									(toppingName) => {
										const pizzaExtraTopping = pizzaExtraToppings.filter(
											(topping) => topping.toppingName === toppingName
										)[0];
										// if (values.secondHalfPizzaCombo3) {
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
										<CheckboxGroup {...rest} id="extraToppingsCombo3">
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
																name="extraToppingsCombo3"
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
																			{values?.secondHalfPizzaCombo3[0]
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
			{values.pizzaCombo3 && (
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
						<Field name="secondHalfPizzaCombo3">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (values.secondHalfPizzaCombo3) {
									values.secondHalfPriceCombo3 = 1;
								}
								if (values.secondHalfPizzaCombo3.length === 0) {
									values.secondHalfPriceCombo3 = 0;
									values.secondHalfPizzaExtraToppingsCombo3 = '';
									values.secondHalfPizzaExtraToppingsPricesCombo3 = [];
								}

								return (
									<FormControl>
										<RadioGroup {...rest} id="secondHalfPizzaCombo3">
											<VStack align="start" pl="2" gap={2}>
												{secondHalfPizzaOptions?.map(({ name }, index) => {
													if (name !== 'No Second half pizza') {
														return (
															<Checkbox
																key={index}
																value={name}
																size="lg"
																name="secondHalfPizzaCombo3"
																onChange={onChange}
																isDisabled={
																	values?.secondHalfPizzaCombo3[0] &&
																	values?.secondHalfPizzaCombo3[0] !== name
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
			{values?.secondHalfPizzaCombo3[0] && (
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Second Half Extra Toppings Pizza 3
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="secondHalfPizzaExtraToppingsCombo3">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.secondHalfPizzaExtraToppingsPricesCombo3 = toppings.map(
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
											id="secondHalfPizzaExtraToppingsCombo3"
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
																name="secondHalfPizzaExtraToppingsCombo3"
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

export default PizzaCombo3;
