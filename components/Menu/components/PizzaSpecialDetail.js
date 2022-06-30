import {
	Box,
	Text,
	RadioGroup,
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
import { PizzaSpecialToppings, PizzaSize } from '../../../configs/constants';
import { plusPriceFormatter } from '../../../utils/helper';
import { useStandardPizza } from '../../../hooks/useDish';

const PizzaSpecialDetail = ({ values, prices }) => {
	const { data: pizzaOptions } = useStandardPizza();
	//	console.log(pizzaOptions);
	const pizzasToFilter = ['CHEESE PIZZA', 'GARLIC PIZZA', 'PESTO PIZZA'];
	const newPizzaOptions = pizzaOptions.filter(
		(name) => !pizzasToFilter.includes(name)
	);
	//	console.log(newPizzaOptions);

	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3]}>
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
						<Field name="size">
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
							Choice of Pizza1
							<Text fontSize="xs" color="grey">
								Required
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="pizzaChoice">
							{({ field }) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="pizzaChoice">
											<VStack align="start" pl="2" gap={2}>
												{newPizzaOptions.map((name, index) => {
													if (name !== 'No Second half pizza') {
														return (
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
			</Accordion>
		</>
	);
};

export default PizzaSpecialDetail;
