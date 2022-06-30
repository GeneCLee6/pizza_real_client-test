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
} from '@chakra-ui/react';
const FirstHalfPizzaChoice = ({ pizzas }) => {
	return (
		<AccordionItem>
			<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
				<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="2">
					Pizza Chioce
					<Text fontSize="xs" color="grey">
						Choose up to 1
					</Text>
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4}>
				{/* <Field name="pizzaCombo1" value={values.pizzaCombo1}>
					{({ field }) => {
						const { onChange, ...rest } = field; */}
				{/* return ( */}
				<FormControl isRequired>
					{/* <RadioGroup {...rest} id="pizzaCombo1"> */}
					<RadioGroup id="pizzaChoice">
						<VStack align="start" pl="2" gap={2}>
							{pizzas?.map((name, index) => {
								if (name !== 'No Second half pizza') {
									return (
										<Radio
											key={index}
											value={name}
											size="lg"
											name="pizzaCombo1"
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
				{/* ); */}
				{/* }}
				</Field> */}
			</AccordionPanel>
		</AccordionItem>
	);
};
export default FirstHalfPizzaChoice;
