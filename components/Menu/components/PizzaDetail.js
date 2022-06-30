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
import { PizzaSize, PizzaBase } from '../../../configs/constants';
import { useExtraToppings } from '../../../hooks/useTopping';
import { useSecondHalfPizza } from '../../../hooks/useDish';

const PizzaDetail = ({ category, name, values, prices }) => {
	const { data: pizzaExtraToppings } = useExtraToppings('pizza');

	const { data: secondHalfPizzaOptions } = useSecondHalfPizza(name);
	const selectedSize = values?.size || 'small';
	const firstHalfPrice = retrieveItemPrice(prices, selectedSize);

	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3, 4, 5]}>
				{/* Size Selection*/}
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Choice of Size
							<Text fontSize="xs" color="grey">
								Required
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="size" value={values.size}>
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (rest.value.trim()) {
									const sizeIndex = PizzaSize.indexOf(rest.value);
									values.sizePrice = prices[sizeIndex] - prices[0];
								}

								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="size">
											<VStack align="start" pl="2" gap={2}>
												{PizzaSize.map((size, index) => (
													<Radio
														key={size}
														value={size}
														size="lg"
														onChange={onChange}
														width="100%"
													>
														<Flex width="100%" justifyContent="space-between">
															<Text
																fontWeight="600"
																fontSize="15px"
																textTransform="capitalize"
															>
																{size}
															</Text>
															{size !== PizzaSize[0] && (
																<Text fontWeight="600" fontSize="15px" ml={4}>
																	{plusPriceFormatter(
																		prices[index] - prices[0]
																	)}
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
						<Field name="base">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (rest.value.trim()) {
									const pizzaBase = PizzaBase.filter(
										(base) => base.name === rest.value
									)[0];
									values.basePrice = pizzaBase.price;
								}
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="base">
											<VStack align="start" pl="2" gap={2}>
												{PizzaBase.map(({ name, price }) => (
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
															{!!price && (
																<Text fontWeight="600" fontSize="15px" ml={4}>
																	{plusPriceFormatter(price)}
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
							<Text fontSize="xs" color="grey">
								Choose up to 34
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="extraToppings">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.extraToppingsPrices = toppings.map((toppingName) => {
									const pizzaExtraTopping = pizzaExtraToppings.filter(
										(topping) => topping.toppingName === toppingName
									)[0];
									// if (values.secondHalf) {
									// 	const price =
									// 		retrieveItemPrice(
									// 			pizzaExtraTopping.prices,
									// 			selectedSize,
									// 		) / 2;
									// 	return price;
									// } else {
									const price = retrieveItemPrice(
										pizzaExtraTopping.prices,
										selectedSize
									);
									return price;
									//	}
								});
								return (
									<FormControl>
										<CheckboxGroup {...rest} id="extraToppings">
											<VStack align="start" pl="2" gap={2}>
												{pizzaExtraToppings?.map(
													({ _id, toppingName, prices }) => {
														const itemPrice = retrieveItemPrice(
															prices,
															selectedSize
														);
														return (
															<Checkbox
																key={_id}
																value={toppingName}
																size="lg"
																name="extraToppings"
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
																			{values?.secondHalf[0]
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
				{/* Second Half Selection*/}
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
						<Field name="secondHalf">
							{({ field }) => {
								const { onChange, ...rest } = field;
								let subtractedPrice = 0;
								if (rest.value.length) {
									const secondHalf = secondHalfPizzaOptions.filter(
										(option) => option.name === rest.value[0]
									)[0];
									const price = retrieveItemPrice(
										secondHalf.prices,
										selectedSize
									);
									subtractedPrice = price - firstHalfPrice;
								}
								if (values.secondHalf) {
									values.secondHalfPrice =
										subtractedPrice > 0 ? subtractedPrice + 1 : 1;
								}
								if (values.secondHalf.length === 0) {
									values.secondHalfPrice = 0;
									values.secondHalfExtraToppings = '';
									values.secondHalfExtraToppingsPrices = [];
								}
								return (
									<FormControl>
										<CheckboxGroup {...rest} id="secondHalf">
											<VStack align="start" pl="2" gap={2}>
												{secondHalfPizzaOptions.map(
													({ name, prices, _id }, index) => {
														const itemPrice = retrieveItemPrice(
															prices,
															selectedSize
														);
														const addPrice = itemPrice - firstHalfPrice;
														if (name !== 'No Second half pizza') {
															return (
																<Checkbox
																	key={_id}
																	value={name}
																	size="lg"
																	name="secondHalf"
																	onChange={onChange}
																	isDisabled={
																		values?.secondHalf[0] &&
																		values?.secondHalf[0] !== name
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
																		{PizzaSize[0] && (
																			<Text
																				fontWeight="600"
																				fontSize="15px"
																				ml={4}
																			>
																				{addPrice > 0
																					? plusPriceFormatter(addPrice)
																					: null}
																			</Text>
																		)}
																	</Flex>
																</Checkbox>
															);
														}
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
				{/* Second Half Extra Topping Selection*/}
				{values?.secondHalfPrice != 0 && (
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
								Second Half Extra Toppings
								<Text fontSize="xs" color="grey">
									Choose up to 34
								</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<Field name="secondHalfExtraToppings">
								{({ field }) => {
									const { onChange, ...rest } = field;
									const toppings = [...rest.value];
									values.secondHalfExtraToppingsPrices = toppings.map(
										(toppingName) => {
											const pizzaExtraTopping = pizzaExtraToppings.filter(
												(topping) => topping.toppingName === toppingName
											)[0];
											const price = retrieveItemPrice(
												pizzaExtraTopping.prices,
												selectedSize
											);
											return price;
										}
									);
									return (
										<FormControl>
											<CheckboxGroup {...rest} id="secondHalfExtraToppings">
												<VStack align="start" pl="2" gap={2}>
													{pizzaExtraToppings?.map(
														({ toppingName, prices }, index) => {
															const itemPrice =
																retrieveItemPrice(prices, selectedSize) / 2;
															return (
																<Checkbox
																	key={index}
																	value={toppingName}
																	size="lg"
																	name="secondHalfExtraToppings"
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
			</Accordion>
		</>
	);
};

export default PizzaDetail;
