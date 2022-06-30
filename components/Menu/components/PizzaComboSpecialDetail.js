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
} from '@chakra-ui/react';
import { Field } from 'formik';
import { SoftDrink, CannedDrink } from '../../../configs/constants';
import { useStandardPizza } from '../../../hooks/useDish';
import { useState } from 'react';

const PizzaComboSpecialDetail = ({ name }) => {
	const { data: pizzaOptions } = useStandardPizza();
	const combos = ['Combo 1', 'Combo 2', 'Combo 3'];
	const drinkOptions = name === combos[0] ? CannedDrink : SoftDrink;
	const chosenComboIndex = combos.indexOf(name);
	const pizzaChoiceLimit = chosenComboIndex + 1;
	const [checkboxValues, setCheckboxValues] = useState([]);
	const [checkedIndexes, setCheckedIndexes] = useState([]);
	const handleCheckBoxChange = (e, name, index, onChange) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			const newCheckboxValues = [...checkboxValues, name];
			setCheckboxValues(newCheckboxValues);
			const newCheckedIndexes = [...checkedIndexes, index];
			setCheckedIndexes(newCheckedIndexes);
			return;
		}
		const newCheckboxValues = checkboxValues.filter((value) => value !== name);
		setCheckboxValues(newCheckboxValues);
		const newCheckedIndexes = checkedIndexes.filter(
			(checkedIndex) => checkedIndex !== index
		);
		setCheckedIndexes(newCheckedIndexes);
		return;
	};

	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3]}>
				{/* Pizza Choices Selection*/}
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
												{pizzaOptions?.map((name, index) => (
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
												))}
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

export default PizzaComboSpecialDetail;
