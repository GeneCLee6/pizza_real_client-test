import { Step, Steps, useSteps, stepIconContainer } from 'chakra-ui-steps';
import {
	Box,
	Flex,
	Button,
	Text,
	Heading,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	VStack,
	FormControl,
	RadioGroup,
	Radio,
	Checkbox,
} from '@chakra-ui/react';
import ExtraToppings from './ExtraToppings';
import FirstHalfPizzaChoice from './FirstHalfPizzaChoice';
import SecondHalfPizzaChoice from './SecondHalfPizzaChoice';
import { useStandardPizza } from '../../../../hooks/useDish';
import { useSecondHalfPizza } from '../../../../hooks/useDish';
import { SoftDrink, CannedDrink } from '../../../../configs/constants';

const Test1ComboDetail = ({ name, values, prices, dishType }) => {
	const { data: standardPizzas } = useStandardPizza(name);
	const { data: secondHalfPizzas } = useSecondHalfPizza(name);
	const drinkOptions = name === 'Combo 1' ? CannedDrink : SoftDrink;
	const PizzaContent = () => {
		return (
			<>
				<FirstHalfPizzaChoice pizzas={standardPizzas} />
				<ExtraToppings title="Extra Toppings" />
				<SecondHalfPizzaChoice pizzas={secondHalfPizzas} values={values} />
				<ExtraToppings title="Second Half Extra Toppings" />
			</>
		);
	};

	const steps = [
		{ label: 'Pizza 1', content: PizzaContent() },
		{ label: 'Pizza 2', content: PizzaContent() },
		{ label: 'Pizza 3', content: PizzaContent() },
	];
	const { nextStep, prevStep, reset, activeStep } = useSteps({
		initialStep: 0,
	});
	return (
		<>
			<Accordion allowToggle allowMultiple>
				<Flex flexDir="column" width="100%">
					<Steps activeStep={activeStep} mb="10">
						{steps.map(({ label, content }, index) => (
							<Step label={label} key={label}>
								{content}
							</Step>
						))}
					</Steps>

					{activeStep === steps.length && (
						<Flex px={4} py={4} width="100%" flexDirection="column">
							<Heading fontSize="xl" textAlign="center">
								All pizza choices have been filled!
							</Heading>
						</Flex>
					)}
					<Flex width="100%" justify="flex-end" my="2">
						<Button
							isDisabled={activeStep === 0}
							mr={4}
							onClick={prevStep}
							size="sm"
							variant="ghost"
							colorScheme="blue"
						>
							Previous Pizza
						</Button>
						<Button
							isDisabled={activeStep === steps.length}
							mr={4}
							onClick={nextStep}
							size="sm"
							variant="ghost"
							colorScheme="blue"
						>
							Next Pizza
						</Button>
					</Flex>
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
								Choice of Flavour
								<Text fontSize="xs" color="grey">
									Required
								</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							{/* <Field name="drinkChoice">
							{({ field }) => {
								const { onChange, ...rest } = field;
								return ( */}
							<FormControl isRequired>
								<RadioGroup id="drinkChoice">
									{/* <RadioGroup {...rest} id="drinkChoice"> */}
									<VStack align="start" pl="2" gap={2}>
										{drinkOptions.map((name) => (
											<Radio key={name} value={name} size="lg">
												{/* <Radio key={name} value={name} size="lg" onChange={onChange}> */}
												<Text fontWeight="600" fontSize="15px">
													{name}
												</Text>
											</Radio>
										))}
									</VStack>
								</RadioGroup>
							</FormControl>
							{/* ); */}
							{/* }}
						</Field> */}
						</AccordionPanel>
					</AccordionItem>
				</Flex>
			</Accordion>
		</>
	);
};

export default Test1ComboDetail;
