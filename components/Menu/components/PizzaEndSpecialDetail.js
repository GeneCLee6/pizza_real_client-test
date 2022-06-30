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
} from "@chakra-ui/react";
import { Field } from "formik";
import { SoftDrink } from "../../../configs/constants";
import { useStandardPizza } from "../../../hooks/useDish";
import { useState } from "react";

const PizzaEndSpecialDetail = ({
	name,
	handleCheckBoxChange,
	checkboxValues,
	pizzaChoiceLimit,
	checkedIndexes,
}) => {
	const { data: pizzaOptions } = useStandardPizza();
	const drinkOptions = SoftDrink;

	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3]}>
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
							Pizza Choices
							<Text fontSize="xs" color="grey">
								Choose up to {pizzaChoiceLimit}
							</Text>
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						<Field name="specialPizzaNotes">
							{({ field }) => {
								const { onChange: onChangeFormik, ...rest } = field;
								return (
									<FormControl>
										<CheckboxGroup {...rest} id="specialPizzaNotes">
											<VStack align="start" pl="2" gap={2}>
												{pizzaOptions?.map((name, index) => {
													if (name !== "No Second half pizza") {
														return (
															<Checkbox
																key={name}
																value={name}
																size="lg"
																name="specialPizzaNotes"
																isDisabled={
																	checkboxValues.length >= pizzaChoiceLimit &&
																	!checkedIndexes.includes(index)
																}
																onChange={(e) => {
																	handleCheckBoxChange(e, name, index);
																	onChangeFormik(e);
																}}
															>
																<Text
																	fontWeight="600"
																	fontSize="15px"
																	textTransform="capitalize"
																>
																	{name}
																</Text>
															</Checkbox>
														);
													}
												})}
											</VStack>
										</CheckboxGroup>
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

export default PizzaEndSpecialDetail;
