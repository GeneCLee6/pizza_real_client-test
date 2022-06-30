import { useState, useContext } from 'react';
import {
	Box,
	Heading,
	Text,
	Flex,
	HStack,
	Button,
	Input,
	useNumberInput,
	Textarea,
	FormControl,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	useDisclosure,
	ModalBody,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	VStack,
	cookieStorageManager,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import PizzaDetail from './components/PizzaDetail';
import PastaDetail from './components/PastaDetail';
import DrinkDetail from './components/DrinkDetail';
import PizzaSpecialDetail from './components/PizzaSpecialDetail';
import EndSpecialDetail from './components/EndSpecialDetail';
import PizzaComboSpecialDetail from './components/PizzaComboSpecialDetail';
import TestComboDetail from './components/TestComboDetail';
import Test1ComboDetail from './components/Test1Combo/Test1ComboDetail';
import { GlobalContext } from '../../contexts/GlobalProvider';
import { OpeningHours } from '../../configs/constants';
const DishDetail = ({ dish, category, onCartClose }) => {
	const { _id, name, description, dishType, prices } = dish;
	const [itemQuantity, setItemQuantity] = useState(1);
	const {
		contextValue: { cart },
		addItem,
	} = useContext(GlobalContext);

	const {
		getInputProps,
		getIncrementButtonProps,
		getDecrementButtonProps,
	} = useNumberInput({
		step: 1,
		defaultValue: 1,
		min: 1,
		max: 9,
		precision: 0,
		onChange: (_, valueAsNumber) => setItemQuantity(valueAsNumber),
	});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps({ isReadOnly: true });

	const { isOpen, onOpen, onClose } = useDisclosure();
	const day = new Date().getDay();
	const hour = new Date().getHours();
	const minute = new Date().getMinutes();
	//	console.log('cart', cart);
	const [checkboxValues, setCheckboxValues] = useState([]);
	const [checkedIndexes, setCheckedIndexes] = useState([]);
	const pizzaChoiceLimit = name === 'Friday & Saturday Special 2' ? 3 : 2;
	const handleCheckBoxChange = (e, name, index) => {
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
	const handleAddToCart = (item) => {
		const totalToppingPrice = item.extraToppingsPrices.reduce(
			(sum, value) => (sum += value),
			0
		);
		//	console.log('totalToppingPrice', totalToppingPrice);

		// const secondHalfTotalToppingPrice = item.secondHalfExtraToppingsPrices.reduce(
		// 	(sum, value) => (sum += value),
		// 	0
		// );
		let secondHalfTotalToppingPrice = 0;
		if (item.secondHalfPrice != 0) {
			secondHalfTotalToppingPrice = item.secondHalfExtraToppingsPrices.reduce(
				(sum, value) => (sum += value),
				0
			);
		}
		let totalToppingPriceCombo1 = 0;
		// console.log(item.extraToppingsCombo1.length);
		if (item.extraToppingsCombo1.length > 0) {
			totalToppingPriceCombo1 = item.extraToppingsPricesCombo1.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaCombo1.length) {
			totalToppingPriceCombo1 = totalToppingPriceCombo1 / 2;
		}

		//endspecial

		let totalToppingPriceEndSpecial1 = 0;
		// console.log(item.extraToppingsCombo1.length);
		if (item.extraToppingsEndSpecial1.length > 0) {
			totalToppingPriceEndSpecial1 = item.extraToppingsPricesEndSpecial1.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaEndSpecial1.length) {
			totalToppingPriceEndSpecial1 = totalToppingPriceEndSpecial1 / 2;
		}

		let totalToppingPriceCombo2 = 0;
		if (item.extraToppingsCombo2.length > 0) {
			totalToppingPriceCombo2 = item.extraToppingsPricesCombo2.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaCombo2.length) {
			totalToppingPriceCombo2 = totalToppingPriceCombo2 / 2;
		}

		//end special
		let totalToppingPriceEndSpecial2 = 0;
		if (item.extraToppingsEndSpecial2.length > 0) {
			totalToppingPriceEndSpecial2 = item.extraToppingsPricesEndSpecial2.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaEndSpecial2.length) {
			totalToppingPriceEndSpecial2 = totalToppingPriceEndSpecial2 / 2;
		}

		let totalToppingPriceCombo3 = 0;
		if (item.extraToppingsCombo3.length > 0) {
			totalToppingPriceCombo3 = item.extraToppingsPricesCombo3.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaCombo3.length) {
			totalToppingPriceCombo3 = totalToppingPriceCombo3 / 2;
		}

		//end special
		let totalToppingPriceEndSpecial3 = 0;
		if (item.extraToppingsEndSpecial3.length > 0) {
			totalToppingPriceEndSpecial3 = item.extraToppingsPricesEndSpecial3.reduce(
				(sum, value) => (sum += value),
				0
			);
		}

		if (item.secondHalfPizzaEndSpecial3.length) {
			totalToppingPriceEndSpecial3 = totalToppingPriceEndSpecial3 / 2;
		}
		//end3
		const secondHalfTotalToppingPriceCombo1 = item.secondHalfPizzaExtraToppingsPricesCombo1.reduce(
			(sum, value) => (sum += value),
			0
		);
		const secondHalfTotalToppingPriceCombo2 = item.secondHalfPizzaExtraToppingsPricesCombo2.reduce(
			(sum, value) => (sum += value),
			0
		);
		const secondHalfTotalToppingPriceCombo3 = item.secondHalfPizzaExtraToppingsPricesCombo3.reduce(
			(sum, value) => (sum += value),
			0
		);

		//end special
		const secondHalfTotalToppingPriceEndSpecial1 = item.secondHalfPizzaExtraToppingsPricesEndSpecial1.reduce(
			(sum, value) => (sum += value),
			0
		);
		const secondHalfTotalToppingPriceEndSpecial2 = item.secondHalfPizzaExtraToppingsPricesEndSpecial2.reduce(
			(sum, value) => (sum += value),
			0
		);
		const secondHalfTotalToppingPriceEndSpecial3 = item.secondHalfPizzaExtraToppingsPricesEndSpecial3.reduce(
			(sum, value) => (sum += value),
			0
		);
		//end
		let currentPrice = 0;
		if (dishType === 'pizza' || dishType === 'gourmet') {
			const firstHalfPrice = prices[0];
			if (item.secondHalf.length) {
				secondHalfTotalToppingPrice = secondHalfTotalToppingPrice / 2;
				totalToppingPrice = totalToppingPrice / 2;
			}
			const pizzaPrice =
				firstHalfPrice +
				item.sizePrice +
				item.basePrice +
				totalToppingPrice +
				secondHalfTotalToppingPrice +
				item.secondHalfPrice;
			currentPrice = pizzaPrice;
		}

		if (dishType === 'pizzaspecial') {
			let pizzaPrice = 0;
			const firstHalfPrice = prices[0];
			if (item.extraToppings != '') {
				pizzaPrice =
					firstHalfPrice + item.sizePrice + item.extraToppingsPrices[0];
			} else {
				pizzaPrice = firstHalfPrice + item.sizePrice;
			}

			currentPrice = pizzaPrice;
		}
		if (dishType === 'testspecial') {
			const firstHalfPrice = prices[0];
			if (item.secondHalfPriceCombo1 === 0) {
				item.secondHalfPizzaExtraToppingsCombo1 = '';
				secondHalfTotalToppingPriceCombo1 = 0;
			}
			if (item.secondHalfPriceCombo2 === 0) {
				item.secondHalfPizzaExtraToppingsCombo2 = '';
				secondHalfTotalToppingPriceCombo2 = 0;
			}
			if (item.secondHalfPriceCombo3 === 0) {
				item.secondHalfPizzaExtraToppingsCombo3 = '';
				secondHalfTotalToppingPriceCombo3 = 0;
			}
			const pizzaPrice =
				firstHalfPrice +
				item.basePriceCombo1 +
				item.basePriceCombo2 +
				item.basePriceCombo3 +
				item.secondHalfPriceCombo1 +
				item.secondHalfPriceCombo2 +
				item.secondHalfPriceCombo3 +
				totalToppingPriceCombo1 +
				totalToppingPriceCombo2 +
				totalToppingPriceCombo3 +
				secondHalfTotalToppingPriceCombo1 +
				secondHalfTotalToppingPriceCombo2 +
				secondHalfTotalToppingPriceCombo3 +
				item.upgradeDrinkPrice;
			currentPrice = pizzaPrice;
		}

		if (dishType === 'pizzaendspecial') {
			const firstHalfPrice = prices[0];
			if (item.secondHalfPriceEndSpecial1 === 0) {
				item.secondHalfPizzaExtraToppingsEndSpecial1 = '';
				secondHalfTotalToppingPriceEndSpecial1 = 0;
			}
			if (item.secondHalfPriceEndSpecial2 === 0) {
				item.secondHalfPizzaExtraToppingsEndSpecial2 = '';
				secondHalfTotalToppingPriceEndSpecial2 = 0;
			}
			if (item.secondHalfPriceEndSpecial3 === 0) {
				item.secondHalfPizzaExtraToppingsEndSpecial3 = '';
				secondHalfTotalToppingPriceEndSpecial3 = 0;
			}
			console.log('firstHalfPrice', firstHalfPrice);
			console.log('basePriceEndSpecial1', item.basePriceEndSpecial1);
			console.log('basePriceEndSpecial2', item.basePriceEndSpecial2);
			console.log('basePriceEndSpecial3', item.basePriceEndSpecial3);
			console.log(
				'secondHalfPriceEndSpecial1',
				item.secondHalfPriceEndSpecial1
			);
			console.log(
				'secondHalfPriceEndSpecial2',
				item.secondHalfPriceEndSpecial2
			);
			console.log(
				'secondHalfPriceEndSpecial3',
				item.secondHalfPriceEndSpecial3
			);
			console.log('totalToppingPriceEndSpecial1', totalToppingPriceEndSpecial1);
			console.log('totalToppingPriceEndSpecial2', totalToppingPriceEndSpecial2);
			console.log('totalToppingPriceEndSpecial3', totalToppingPriceEndSpecial3);
			console.log(
				'secondHalfTotalToppingPriceEndSpecial1',
				secondHalfTotalToppingPriceEndSpecial1
			);
			console.log(
				'secondHalfTotalToppingPriceEndSpecial2',
				secondHalfTotalToppingPriceEndSpecial2
			);
			console.log(
				'secondHalfTotalToppingPriceEndSpecial3',
				secondHalfTotalToppingPriceEndSpecial3
			);
			const pizzaPrice =
				firstHalfPrice +
				item.basePriceEndSpecial1 +
				item.basePriceEndSpecial2 +
				item.basePriceEndSpecial3 +
				item.secondHalfPriceEndSpecial1 +
				item.secondHalfPriceEndSpecial2 +
				item.secondHalfPriceEndSpecial3 +
				totalToppingPriceEndSpecial1 +
				totalToppingPriceEndSpecial2 +
				totalToppingPriceEndSpecial3 +
				secondHalfTotalToppingPriceEndSpecial1 +
				secondHalfTotalToppingPriceEndSpecial2 +
				secondHalfTotalToppingPriceEndSpecial3;
			currentPrice = pizzaPrice;
			console.log('currentPrice', currentPrice);
		}

		// if (dishType === 'pizzaendspecial') {
		// 	const firstHalfPrice = prices[0];
		// 	const pizzaPrice = firstHalfPrice;
		// 	currentPrice = pizzaPrice;
		// }

		if (dishType === 'pasta') {
			const pastaPrice = prices[0];
			const toalPastaPrice =
				pastaPrice + totalToppingPrice + item.pastaChoicePrice;
			currentPrice = toalPastaPrice;
		}

		if (['drink', 'dessert', 'main', 'pizzacombospecial'].includes(dishType))
			currentPrice = prices[0];

		const newItem = {
			_id,
			name,
			...item,
			dishType,
			quantity: itemQuantity,
			currentPrice,
		};

		addItem(newItem);
		console.log('newItem', newItem);
		return;
	};

	const isArrEqual = (arr1, arr2) => {
		if (arr1 && arr2) {
			return (
				arr1?.length === arr2?.length &&
				arr1?.every((ele) => arr2?.includes(ele))
			);
		} else if (arr1 && !arr2) {
			return false;
		} else if (!arr1 && arr2) {
			return false;
		} else {
			return true;
		}
	};

	return (
		<Formik
			enableReinitialize
			initialValues={{
				pizzaCombo1: '',
				secondHalfPizzaCombo1: '',
				upgradeDrinks: [],
				upgradeDrinkPrice: 0,
				pizzaCombo2: '',
				secondHalfPizzaCombo2: '',
				pizzaCombo3: '',
				secondHalfPizzaCombo3: '',
				size: 'small',
				sizePrice: 0,
				base: 'normal crust',
				basePrice: 0,
				baseCombo1: 'normal crust',
				basePriceCombo1: 0,
				baseCombo2: 'normal crust',
				basePriceCombo2: 0,
				baseCombo3: 'normal crust',
				basePriceCombo3: 0,
				extraToppings: '',
				extraToppingsPrices: [],
				extraToppingsCombo1: '',
				extraToppingsPricesCombo1: [],
				extraToppingsCombo2: '',
				extraToppingsPricesCombo2: [],
				extraToppingsCombo3: '',
				extraToppingsPricesCombo3: [],
				secondHalfPizzaExtraToppingsCombo1: '',
				secondHalfPizzaExtraToppingsPricesCombo1: [],
				secondHalfPizzaExtraToppingsCombo2: '',
				secondHalfPizzaExtraToppingsPricesCombo2: [],
				secondHalfPizzaExtraToppingsCombo3: '',
				secondHalfPizzaExtraToppingsPricesCombo3: [],
				secondHalf: '',
				secondHalfExtraToppings: '',
				secondHalfExtraToppingsPrices: [],
				secondHalfPrice: 0,
				secondHalfPriceCombo1: 0,
				secondHalfPriceCombo2: 0,
				secondHalfPriceCombo3: 0,
				note: '',
				pastaChoice: '',
				pizzaChoice: '',
				pastaChoicePrice: 0,
				drinkChoice: '',
				specialPizzaNotes: '',
				pizzaEndSpecial1: '', //end special pizza 1 data
				baseEndSpecial1: 'normal crust',
				basePriceEndSpecial1: 0,
				extraToppingsEndSpecial1: '',
				extraToppingsPricesEndSpecial1: [],
				secondHalfPizzaEndSpecial1: '',
				secondHalfPriceEndSpecial1: 0,
				secondHalfPizzaExtraToppingsEndSpecial1: '',
				secondHalfPizzaExtraToppingsPricesEndSpecial1: [],
				pizzaEndSpecial2: '', //end special pizza 2 data
				baseEndSpecial2: 'normal crust',
				basePriceEndSpecial2: 0,
				extraToppingsEndSpecial2: '',
				extraToppingsPricesEndSpecial2: [],
				secondHalfPizzaEndSpecial2: '',
				secondHalfPriceEndSpecial2: 0,
				secondHalfPizzaExtraToppingsEndSpecial2: '',
				secondHalfPizzaExtraToppingsPricesEndSpecial2: [],
				pizzaEndSpecial3: '', //end special pizza 3 data
				baseEndSpecial3: 'normal crust',
				basePriceEndSpecial3: 0,
				extraToppingsEndSpecial3: '',
				extraToppingsPricesEndSpecial3: [],
				secondHalfPizzaEndSpecial3: '',
				secondHalfPriceEndSpecial3: 0,
				secondHalfPizzaExtraToppingsEndSpecial3: '',
				secondHalfPizzaExtraToppingsPricesEndSpecial3: [],
			}}
			//validationSchema={MailSchema}
			onSubmit={(values) => {
				if (
					hour < OpeningHours[day].mode24[0].hour ||
					hour > OpeningHours[day].mode24[1].hour ||
					(hour == OpeningHours[day].mode24[0].hour &&
						minute < OpeningHours[day].mode24[0].minute) ||
					(hour == OpeningHours[day].mode24[1].hour &&
						minute > OpeningHours[day].mode24[1].minute)
				) {
					onOpen();
				} else {
					if (
						(values.pizzaCombo1 === values?.secondHalfPizzaCombo1[0] &&
							isArrEqual(
								values.extraToppingsCombo1,
								values.secondHalfPizzaExtraToppingsCombo1
							)) ||
						(values.pizzaCombo2 === values?.secondHalfPizzaCombo2[0] &&
							isArrEqual(
								values.extraToppingsCombo2,
								values.secondHalfPizzaExtraToppingsCombo2
							)) ||
						(values.pizzaCombo3 === values?.secondHalfPizzaCombo3[0] &&
							isArrEqual(
								values.extraToppingsCombo3,
								values.secondHalfPizzaExtraToppingsCombo3
							)) ||
						(checkboxValues.length > 0 &&
							checkboxValues.length < pizzaChoiceLimit)
					) {
						onOpen();
					} else {
						handleAddToCart(values);
						onCartClose();
					}
				}
			}}
		>
			{({ isSubmitting, errors, touched, values }) => (
				<Form>
					{console.log('values', values)}
					<Box mb={4} px={6}>
						<Heading mb={1} textTransform="capitalize">
							{name}
						</Heading>
						<Text>{description}</Text>
					</Box>

					{(dishType === 'pizza' || dishType === 'gourmet') && (
						<PizzaDetail
							category={category}
							prices={prices}
							values={values}
							name={name}
						/>
					)}
					{dishType === 'pasta' && <PastaDetail values={values} />}
					{dishType === 'drink' && <DrinkDetail name={name} />}
					{dishType === 'pizzaspecial' && (
						<PizzaSpecialDetail prices={prices} values={values} />
					)}
					{dishType === 'pizzaendspecial' && (
						<EndSpecialDetail
							prices={prices}
							values={values}
							name={name}
							dishType={dishType}
						/>
					)}
					{dishType === 'pizzacombospecial' && (
						<PizzaComboSpecialDetail name={name} />
					)}
					{dishType === 'testspecial' && (
						<TestComboDetail
							prices={prices}
							values={values}
							name={name}
							dishType={dishType}
						/>
					)}
					{dishType === 'testspecial1' && (
						<Test1ComboDetail
							prices={prices}
							values={values}
							name={name}
							dishType={dishType}
						/>
					)}

					{/* Note Selection*/}
					<Box borderRadius="1px" backgroundColor="gray.100" px="6" py={2}>
						<Box
							flex="1"
							textAlign="left"
							fontWeight="700"
							fontSize="lg"
							py="2"
						>
							Special instructions
						</Box>
					</Box>
					<Box px="6" pt="3">
						<Field name="note" value={values.note}>
							{({ field }) => (
								<FormControl>
									<Textarea
										border="none"
										id="note"
										placeholder="Add a note"
										{...field}
									/>
								</FormControl>
							)}
						</Field>
					</Box>
					{(values.pizzaCombo1 === values?.secondHalfPizzaCombo1[0] ||
						values.pizzaCombo2 === values?.secondHalfPizzaCombo2[0] ||
						values.pizzaCombo3 === values?.secondHalfPizzaCombo3[0]) && (
						<Box px={4}>
							<Text color="red.400">
								<strong>
									*NOTE: <br /> Your pizza choice is same as your second half
									pizza, would you like to continue?
								</strong>
							</Text>
						</Box>
					)}

					<Flex w="100%" justify="center" alignItems="center" my={2}>
						<HStack py={4} maxW="140px">
							<Button rounded="full" {...dec}>
								-
							</Button>
							<Input {...input} />
							<Button rounded="full" {...inc}>
								+
							</Button>
						</HStack>
					</Flex>
					<Box px={4}>
						<Button
							my="12px"
							color="white"
							bgColor="red.500"
							fontWeight="500"
							borderRadius="22px"
							width="full"
							_hover={{}}
							type="submit"
						>
							Add to Cart
						</Button>
					</Box>
					<Modal
						w="100%"
						size="lg"
						onClose={onClose}
						h="100vh"
						isOpen={isOpen}
						motionPreset="slideInBottom"
					>
						<ModalOverlay />
						<ModalContent>
							<ModalCloseButton
								borderRadius="50px"
								backgroundColor="gray.300"
								_focus={{ boxShadow: 'none' }}
								zIndex="2"
							/>

							<ModalBody px={0}>
								<VStack>
									<Alert status="error" display="block">
										<AlertIcon />
										<>
											<AlertTitle>
												We couldn&apos;t checkout your order.
											</AlertTitle>
											{(hour < OpeningHours[day].mode24[0].hour ||
												hour > OpeningHours[day].mode24[1].hour ||
												(hour == OpeningHours[day].mode24[0].hour &&
													minute < OpeningHours[day].mode24[0].minute) ||
												(hour == OpeningHours[day].mode24[1].hour &&
													minute > OpeningHours[day].mode24[1].minute)) && (
												<AlertDescription>
													Closed Shop.
													<br />
													Please check our opening hours
													<br />
													OPEN：{OpeningHours[day].mode12[0]}
												</AlertDescription>
											)}
											{((values.pizzaCombo1 ===
												values?.secondHalfPizzaCombo1[0] &&
												isArrEqual(
													values.extraToppingsCombo1,
													values.secondHalfPizzaExtraToppingsCombo1
												)) ||
												(values.pizzaCombo2 ===
													values?.secondHalfPizzaCombo2[0] &&
													isArrEqual(
														values.extraToppingsCombo2,
														values.secondHalfPizzaExtraToppingsCombo2
													)) ||
												(values.pizzaCombo3 ===
													values?.secondHalfPizzaCombo3[0] &&
													isArrEqual(
														values.extraToppingsCombo3,
														values.secondHalfPizzaExtraToppingsCombo3
													))) && (
												<AlertDescription>
													Your <strong>pizza choice</strong> same as your{' '}
													<strong>second half</strong> pizza choice.
												</AlertDescription>
											)}
											{checkboxValues.length > 0 &&
												checkboxValues.length < pizzaChoiceLimit && (
													<AlertDescription>
														Please choose {pizzaChoiceLimit} Pizzas.
													</AlertDescription>
												)}
										</>
									</Alert>
								</VStack>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Form>
			)}
		</Formik>
	);
};

export default DishDetail;
