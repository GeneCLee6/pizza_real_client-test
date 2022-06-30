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
} from '@chakra-ui/react';
import { Field } from 'formik';
import { SoftDrink, CannedDrink } from '../../../configs/constants';

const DrinkDetail = ({ name }) => {
	const drinkOptions = name === 'Soft Drink (Canned)' ? CannedDrink : SoftDrink;
	return (
		<>
			<Accordion allowToggle allowMultiple defaultIndex={[0, 1, 2, 3]}>
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

export default DrinkDetail;
