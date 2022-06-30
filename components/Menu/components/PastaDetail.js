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

import { PastaChoice } from '../../../configs/constants';
import { useExtraToppings } from '../../../hooks/useTopping';
import { retrieveItemPrice, plusPriceFormatter } from '../../../utils/helper';
const PastaDetail = ({ values }) => {
	const { data: pastaExtraToppings } = useExtraToppings('pasta');
	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3]}>
				{/* Choice Selection*/}
				<AccordionItem>
					<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Choice of Pasta
							<Text fontSize="xs" color="grey">
								Required
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="pastaChoice">
							{({ field }) => {
								const { onChange, ...rest } = field;
								if (['Fettuccine', 'Spaghetti', 'Penne'].includes(rest.value)) {
									values.pastaChoicePrice = 0;
								}
								if (['Gnocchi'].includes(rest.value)) {
									values.pastaChoicePrice = 1;
								}
								if (['Ravioli', 'Spinach Ravioli'].includes(rest.value)) {
									values.pastaChoicePrice = 1.5;
								}
								return (
									<FormControl isRequired>
										<RadioGroup {...rest} id="pastaChoice">
											<VStack align="start" pl="2" gap={2}>
												{PastaChoice.map((choice) => (
													<Radio
														key={choice}
														value={choice}
														size="lg"
														onChange={onChange}
													>
														<Flex w="100%" justify="space-between">
															<Text
																fontWeight="600"
																fontSize="15px"
																textTransform="capitalize"
															>
																{choice}
															</Text>
															{[
																'Gnocchi',
																'Ravioli',
																'Spinach Ravioli',
															].includes(choice) && (
																<Text fontWeight="600" fontSize="15px" ml={4}>
																	{plusPriceFormatter(
																		choice === 'Gnocchi' ? 1 : 1.5
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
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="extraToppings">
							{({ field }) => {
								const { onChange, ...rest } = field;
								const toppings = [...rest.value];
								values.extraToppingsPrices = toppings.map((toppingName) => {
									const extraToppings = pastaExtraToppings.filter(
										(topping) => topping.toppingName === toppingName
									)[0];
									const price = retrieveItemPrice(extraToppings.prices);
									return price;
								});
								return (
									<FormControl>
										<CheckboxGroup {...rest} id="extraToppings">
											<VStack align="start" pl="2" gap={2}>
												{pastaExtraToppings?.map(
													({ _id, toppingName, prices }) => (
														<Checkbox
															key={_id}
															value={toppingName}
															size="lg"
															name="extraToppings"
															onChange={onChange}
														>
															<Flex width="100%" justifyContent="space-between">
																<Text
																	fontWeight="600"
																	fontSize="15px"
																	textTransform="capitalize"
																>
																	{toppingName}
																</Text>
																<Text fontWeight="600" fontSize="15px" ml={4}>
																	{plusPriceFormatter(prices[0])}
																</Text>
															</Flex>
														</Checkbox>
													)
												)}
											</VStack>
										</CheckboxGroup>
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

export default PastaDetail;
