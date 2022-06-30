import {
	AccordionItem,
	AccordionButton,
	FormControl,
	AccordionPanel,
	AccordionIcon,
	Box,
	CheckboxGroup,
	VStack,
	Checkbox,
	Flex,
	Radio,
	RadioGroup,
	Text,
} from "@chakra-ui/react";
const SecondHalfExtraToppings = ({ pizzas, values }) => {
	return (
		<>
			<AccordionItem>
				<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
					<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="2">
						Choice of Second Half
						<Text fontSize="xs" color="grey">
							$1.0 extra
						</Text>
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					{/* <Field name="secondHalfPizzaCombo1">
				{({ field }) => {
					const { onChange, ...rest } = field;
					if (values.secondHalfPizzaCombo1) {
						values.secondHalfPriceCombo1 = 1;
					}
					if (values.secondHalfPizzaCombo1.length === 0) {
						values.secondHalfPriceCombo1 = 0;
						values.secondHalfPizzaExtraToppingsCombo1 = '';
						values.secondHalfTotalToppingPriceCombo1 = '';
					}

					return ( */}
					<FormControl>
						<RadioGroup id="secondHalfPizzaCombo1">
							{/* <RadioGroup {...rest} id="secondHalfPizzaCombo1"> */}
							<VStack align="start" pl="2" gap={2}>
								{pizzas?.map(({ name }, index) => {
									if (name !== "No Second half pizza") {
										return (
											<Checkbox
												key={index}
												value={name}
												size="lg"
												name="secondHalfPizzaCombo1"
												// onChange={onChange}
												isDisabled={
													values?.secondHalfPizzaCombo1[0] &&
													values?.secondHalfPizzaCombo1[0] !== name
												}
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
											</Checkbox>
										);
									}
								})}
							</VStack>
						</RadioGroup>
					</FormControl>
					{/* );
				}}
			</Field> */}
				</AccordionPanel>
			</AccordionItem>
		</>
	);
};

export default SecondHalfExtraToppings;
