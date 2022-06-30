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
import PizzaEndSpecial2 from './PizzaEndSpecial2';
import PizzaEndSpecial3 from './PizzaEndSpecial3';

const EndSpecialDetail = ({ name, values, prices, dishType }) => {
	console.log('dishName', name);
	const { data: pizzaExtraToppings } = useExtraToppings('pizza');
	const { data: secondHalfPizzaOptions } = useComboSecondHalfPizza(name);
	const { data: standardPizzas } = useStandardPizza(name);
	//	const selectedSize = values?.size || 'small';
	//	const combos = ['Combo 1', 'Combo 2', 'Combo 3'];
	const drinkOptions = SoftDrink;
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
						<Field name="pizzaEndSpecial1" value={values.pizzaEndSpecial1}>
							{({ field }) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="pizzaEndSpecial1">
											<VStack align="start" pl="2" gap={2}>
												{standardPizzas?.map((name, index) => {
													if (name !== 'No Second half pizza') {
														return (
															<Radio
																key={index}
																value={name}
																size="lg"
																name="pizzaEndSpecial1"
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
						<Field name="baseEndSpecial1">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (rest.value.trim()) {
									if (values.baseEndSpecial1 === 'normal crust') {
										values.basePriceEndSpecial1 = 0;
										console.log('here1');
									} else {
										values.basePriceEndSpecial1 = 1;
										console.log('here2');
									}
								}
								return (
									<FormControl>
										<RadioGroup {...rest} id="baseEndSpecial1">
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
				{values.pizzaEndSpecial1 && (
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
							<Field name="extraToppingsEndSpecial1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									const toppings = [...rest.value];
									values.extraToppingsPricesEndSpecial1 = toppings.map(
										(toppingName) => {
											const pizzaExtraTopping = pizzaExtraToppings.filter(
												(topping) => topping.toppingName === toppingName
											)[0];

											let price = 0;
											if (name === 'Friday & Saturday Special 3') {
												price = retrieveItemPrice(
													pizzaExtraTopping.prices,
													'family'
												);
											} else {
												price = retrieveItemPrice(
													pizzaExtraTopping.prices,
													'large'
												);
											}
											return price;
										}
									);

									return (
										<FormControl>
											<CheckboxGroup {...rest} id="extraToppingsEndSpecial1">
												<VStack align="start" pl="2" gap={2}>
													{pizzaExtraToppings?.map(
														({ toppingName, prices }, index) => {
															let itemPrice = 0;
															if (name === 'Friday & Saturday Special 3') {
																itemPrice = retrieveItemPrice(prices, 'family');
															} else {
																itemPrice = retrieveItemPrice(prices, 'large');
															}

															return (
																<Checkbox
																	key={index}
																	value={toppingName}
																	size="lg"
																	name="extraToppingsEndSpecial1"
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
																				{values?.secondHalfPizzaEndSpecial1[0]
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
				{values.pizzaEndSpecial1 && (
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
							<Field name="secondHalfPizzaEndSpecial1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									if (values.secondHalfPizzaEndSpecial1) {
										values.secondHalfPriceEndSpecial1 = 1;
									}
									if (values.secondHalfPizzaEndSpecial1.length === 0) {
										values.secondHalfPriceEndSpecial1 = 0;
										values.secondHalfPizzaExtraToppingsEndSpecial1 = '';
									}

									return (
										<FormControl>
											<RadioGroup {...rest} id="secondHalfPizzaEndSpecial1">
												<VStack align="start" pl="2" gap={2}>
													{secondHalfPizzaOptions?.map(({ name }, index) => {
														if (name !== 'No Second half pizza') {
															return (
																<Checkbox
																	key={index}
																	value={name}
																	size="lg"
																	name="secondHalfPizzaEndSpecial1"
																	onChange={onChange}
																	isDisabled={
																		values?.secondHalfPizzaEndSpecial1[0] &&
																		values?.secondHalfPizzaEndSpecial1[0] !==
																			name
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
				{values?.secondHalfPizzaEndSpecial1[0] && (
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
							<Field name="secondHalfPizzaExtraToppingsEndSpecial1">
								{({ field }) => {
									const { onChange, ...rest } = field;
									const toppings = [...rest.value];
									values.secondHalfPizzaExtraToppingsPricesEndSpecial1 = toppings.map(
										(toppingName) => {
											const pizzaExtraTopping = pizzaExtraToppings.filter(
												(topping) => topping.toppingName === toppingName
											)[0];
											let price = 0;
											if (name === 'Friday & Saturday Special 3') {
												price =
													retrieveItemPrice(
														pizzaExtraTopping.prices,
														'family'
													) / 2;
											} else {
												price =
													retrieveItemPrice(pizzaExtraTopping.prices, 'large') /
													2;
											}

											return price;
										}
									);

									return (
										<FormControl>
											<CheckboxGroup
												{...rest}
												id="secondHalfPizzaExtraToppingsEndSpecial1"
											>
												<VStack align="start" pl="2" gap={2}>
													{pizzaExtraToppings?.map(
														({ toppingName, prices }, index) => {
															let itemPrice = 0;
															if (name === 'Friday & Saturday Special 3') {
																itemPrice =
																	retrieveItemPrice(prices, 'family') / 2;
															} else {
																itemPrice =
																	retrieveItemPrice(prices, 'large') / 2;
															}

															return (
																<Checkbox
																	key={index}
																	value={toppingName}
																	size="lg"
																	name="secondHalfPizzaExtraToppingsEndSpecial1"
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

				{<PizzaEndSpecial2 values={values} name={name} />}
				{name === 'Friday & Saturday Special 2' && (
					<PizzaEndSpecial3 values={values} name={name} />
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
			</Accordion>
		</>
	);
};

export default EndSpecialDetail;
