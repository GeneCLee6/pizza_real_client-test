import { useExtraToppings } from '../../../../hooks/useTopping';
import {
	retrieveItemPrice,
	plusPriceFormatter,
} from '../../../../utils/helper';
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
	Text,
} from '@chakra-ui/react';
const ExtraToppings = ({ title }) => {
	const { data: pizzaExtraToppings } = useExtraToppings('pizza');

	return (
		<AccordionItem>
			<AccordionButton borderRadius="1px" backgroundColor="gray.100" px="6">
				<Box flex="1" textAlign="left" fontWeight="700" fontSize="lg" py="4">
					{title}
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4}>
				{/* <Field name="secondHalfPizzaExtraToppingsCombo1">
                {({ field }) => {
                  const { onChange, ...rest } = field;
                  const toppings = [...rest.value];
                  values.secondHalfPizzaExtraToppingsPricesCombo1 =
                    toppings.map((toppingName) => {
                      const pizzaExtraTopping = pizzaExtraToppings.filter(
                        (topping) => topping.toppingName === toppingName,
                      )[0];
                      const price =
                        retrieveItemPrice(pizzaExtraTopping.prices, "large") /
                        2;
                      return price;
                    }); */}
				{/* return ( */}
				<FormControl>
					{/* <CheckboxGroup {...rest} id="secondHalfPizzaExtraToppingsCombo1"> */}
					<CheckboxGroup id="extraToppings">
						<VStack align="start" pl="2" gap={2}>
							{pizzaExtraToppings?.map(({ toppingName, prices }, index) => {
								const itemPrice = retrieveItemPrice(prices, 'large') / 2;
								return (
									<Checkbox
										key={index}
										value={toppingName}
										size="lg"
										name="secondHalfPizzaExtraToppingsCombo1"
										// onChange={onChange}
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
												<Text fontWeight="600" fontSize="15px" ml={4}>
													{plusPriceFormatter(itemPrice)}
												</Text>
											)}
										</Flex>
									</Checkbox>
								);
							})}
						</VStack>
					</CheckboxGroup>
				</FormControl>
				{/* ); */}
				{/* }}
              </Field> */}
			</AccordionPanel>
		</AccordionItem>
	);
};

export default ExtraToppings;
