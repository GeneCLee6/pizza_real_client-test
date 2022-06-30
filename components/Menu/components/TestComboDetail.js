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
import PizzaCombo2 from './PizzaCombo2';
import PizzaCombo3 from './PizzaCombo3';

const TestComboDetail = ({ name, values, prices, dishType }) => {
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
			<Accordion
				allowToggle
				allowMultiple
				defaultIndex={[
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
				]}
			>
				{/* Pizza Selection*/}
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Pizza Chioce 1
							<Text fontSize="xs" color="grey">
								Choose up to 1
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="pizzaCombo1" value={values.pizzaCombo1}>
							{({ field }) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="pizzaCombo1">
											<VStack align="start" pl="2" gap={2}>
												{standardPizzas?.map((name, index) => {
													if (name !== 'No Second half pizza') {
														return (
															<Radio
																key={index}
																value={name}
																size="lg"
																name="pizzaCombo1"
																onChange={onChange}
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
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Choice of Base
							<Text fontSize="xs" color="grey">
								Choose Up to 1
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="baseCombo1">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (rest.value.trim()) {
									if (values.baseCombo1 === 'normal crust') {
										values.basePriceCombo1 = 0;
									} else {
										values.basePriceCombo1 = 1;
									}
								}
								return (
									<FormControl>
										<RadioGroup {...rest} id="baseCombo1">
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
				{values.pizzaCombo1 && (
					<AccordionItem>
						<AccordionButton
							borderRadius="1px"
							backgroundColor="gray.100"
							px="6"
						>
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
							<Field name="extraToppingsCombo1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									const toppings = [...rest.value];
									values.extraToppingsPricesCombo1 = toppings.map(
										(toppingName) => {
											const pizzaExtraTopping = pizzaExtraToppings.filter(
												(topping) => topping.toppingName === toppingName
											)[0];
											// if (values.secondHalfPizzaCombo1) {
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
											// 	}
										}
									);

									return (
										<FormControl>
											<CheckboxGroup {...rest} id="extraToppingsCombo1">
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
																	name="extraToppingsCombo1"
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
																				{values?.secondHalfPizzaCombo1[0]
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
				{values.pizzaCombo1 && (
					<AccordionItem>
						<AccordionButton
							borderRadius="1px"
							backgroundColor="gray.100"
							px="6"
						>
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
							<Field name="secondHalfPizzaCombo1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									if (values.secondHalfPizzaCombo1) {
										values.secondHalfPriceCombo1 = 1;
									}
									if (values.secondHalfPizzaCombo1.length === 0) {
										values.secondHalfPriceCombo1 = 0;
										values.secondHalfPizzaExtraToppingsCombo1 = '';
									}

									return (
										<FormControl>
											<RadioGroup {...rest} id="secondHalfPizzaCombo1">
												<VStack align="start" pl="2" gap={2}>
													{secondHalfPizzaOptions?.map(({ name }, index) => {
														if (name !== 'No Second half pizza') {
															return (
																<Checkbox
																	key={index}
																	value={name}
																	size="lg"
																	name="secondHalfPizzaCombo1"
																	onChange={onChange}
																	isDisabled={
																		values?.secondHalfPizzaCombo1[0] &&
																		values?.secondHalfPizzaCombo1[0] !== name
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
				{values?.secondHalfPizzaCombo1[0] && (
					<AccordionItem>
						<AccordionButton
							borderRadius="1px"
							backgroundColor="gray.100"
							px="6"
						>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="700"
								fontSize="lg"
								py="2"
							>
								Second Half Extra Toppings Pizza 1
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<Field name="secondHalfPizzaExtraToppingsCombo1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									const toppings = [...rest.value];
									values.secondHalfPizzaExtraToppingsPricesCombo1 = toppings.map(
										(toppingName) => {
											const pizzaExtraTopping = pizzaExtraToppings.filter(
												(topping) => topping.toppingName === toppingName
											)[0];
											const price =
												retrieveItemPrice(pizzaExtraTopping.prices, 'large') /
												2;
											return price;
										}
									);

									return (
										<FormControl>
											<CheckboxGroup
												{...rest}
												id="secondHalfPizzaExtraToppingsCombo1"
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
																	name="secondHalfPizzaExtraToppingsCombo1"
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

				{(name === 'Combo Special 2' || name === 'Combo Special 3') && (
					<PizzaCombo2 values={values} name={name} />
				)}
				{name === 'Combo Special 3' && (
					<PizzaCombo3 values={values} name={name} />
				)}
				{/* Drink Selection*/}
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Choice of Flavour
							<Text fontSize="xs" color="grey">
								Required
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="drinkChoice">
							{({ field }) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="drinkChoice">
											<VStack align="start" pl="2" gap={2}>
												{drinkOptions.map((name) => (
													<Radio
														key={name}
														value={name}
														size="lg"
														onChange={onChange}
													>
														<Text fontWeight="600" fontSize="15px">
															{name}
														</Text>
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
				{/* Upgade Drink Selection*/}
				{values.drinkChoice && name === 'Combo Special 1' && (
					<AccordionItem>
						<AccordionButton
							borderRadius="1px"
							backgroundColor="gray.100"
							px="6"
						>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="700"
								fontSize="lg"
								py="2"
							>
								Upgrade Drink
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<Field name="upgradeDrinks">
								{({ field }) => {
									const { onChange, ...rest } = field;
									values.upgradeDrinkPrice = values.upgradeDrinks.length * 2;
									const itemPrice = 2;
									return (
										<FormControl>
											<CheckboxGroup id="upgradeDrinks">
												<VStack align="start" pl="2" gap={2}>
													<Checkbox
														size="lg"
														value="true"
														name="upgradeDrinks"
														onChange={onChange}
													>
														<Flex>
															<Text
																fontWeight="600"
																fontSize="15px"
																textTransform="capitalize"
															>
																Would you like to upgrade your drink to 1.25L?
															</Text>
															{!!itemPrice && (
																<Text fontWeight="600" fontSize="15px" ml={4}>
																	{plusPriceFormatter(itemPrice)}
																</Text>
															)}
														</Flex>
													</Checkbox>
												</VStack>
											</CheckboxGroup>
										</FormControl>
									);
								}}
							</Field>
						</AccordionPanel>
					</AccordionItem>
				)}
			</Accordion>
		</>
	);
};

export default TestComboDetail;
