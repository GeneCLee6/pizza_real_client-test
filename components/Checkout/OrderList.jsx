import { Box, Flex, Text, Divider, VStack, IconButton } from '@chakra-ui/react';
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalProvider';
import { priceFormatter } from '../../utils/helper';

const OrderList = (props) => {
	const {
		contextValue: { cart },
		removeItem,
		updateItem,
	} = useContext(GlobalContext);

	const orders = [...cart];
	useEffect(() => {
		props.subtotal(calculateSubtotal(orders));
		props.isEmptyCart(orders.length <= 0);
	}, [orders]);

	const calculateSubtotal = (orders) => {
		const subtotal = orders.reduce(
			(sum, value) => sum + value['quantity'] * value['currentPrice'],
			0
		);
		return Number(subtotal);
	};
	const decreaseQuanity = (orderIndex) => {
		const newQuantity = orders[orderIndex].quantity - 1;
		const newOrders = [...orders];
		newOrders[orderIndex].quantity = newQuantity < 1 ? 1 : newQuantity;
		updateItem(newOrders);
		props.subtotal(calculateSubtotal(newOrders));
	};
	const increaseQuanity = (orderIndex) => {
		const newQuantity = orders[orderIndex].quantity + 1;
		const newOrders = [...orders];
		newOrders[orderIndex].quantity = newQuantity;
		updateItem(newOrders);
		props.subtotal(calculateSubtotal(newOrders));
	};

	const deleteOrder = (order) => {
		removeItem(order._id);
		props.subtotal(calculateSubtotal(orders));
	};
	const getPizzaComboSpecialDetails = (order) => {
		const pizzaComboSpecialDetails = [
			[
				'Pizza Choices',
				order.specialPizzaNotes.length
					? order.specialPizzaNotes.join(', ')
					: '-',
			],
			['Choice of Flavour', order.drinkChoice],
		];
		return pizzaComboSpecialDetails;
	};

	const getPizzaEndSpecialDetails = (order) => {
		// const pizzaEndSpecialDetails = [
		// 	[
		// 		"Pizza Choices",
		// 		order.specialPizzaNotes.length
		// 			? order.specialPizzaNotes.join(", ")
		// 			: "-",
		// 	],
		// 	["Choice of Flavour", order.drinkChoice],
		// ];
		// return pizzaEndSpecialDetails;
		const pizzaEndSpecialDetails = [
			['Pizza 1', order.pizzaEndSpecial1],
			[
				order.pizzaEndSpecial1 && order.baseEndSpecial1 ? 'Pizza 1 Base' : null,
				order.pizzaEndSpecial1 && order.baseEndSpecial1
					? order.baseEndSpecial1
					: null,
			],
			[
				order.extraToppingsEndSpecial1.length ? 'Pizza 1 Extra toppings' : null,
				order.extraToppingsEndSpecial1.length
					? order.extraToppingsEndSpecial1.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaEndSpecial1.length ? 'Pizza 1 Second half' : null,
				order.secondHalfPizzaEndSpecial1.length
					? order.secondHalfPizzaEndSpecial1
					: null,
			],
			[
				order.secondHalfPizzaExtraToppingsEndSpecial1.length
					? 'Pizza 1 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsEndSpecial1.length
					? order.secondHalfPizzaExtraToppingsEndSpecial1.join(', ')
					: null,
			],
			[
				order.pizzaEndSpecial2 ? 'Pizza 2' : null,
				order.pizzaEndSpecial2 ? order.pizzaEndSpecial2 : null,
			],
			[
				order.pizzaEndSpecial2 && order.baseEndSpecial2 ? 'Pizza 2 Base' : null,
				order.pizzaEndSpecial2 && order.baseEndSpecial2
					? order.baseEndSpecial2
					: null,
			],
			[
				order.extraToppingsEndSpecial2.length ? 'Pizza 2 Extra toppings' : null,
				order.extraToppingsEndSpecial2.length
					? order.extraToppingsEndSpecial2.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaEndSpecial2.length ? 'Pizza 2 Second half' : null,
				order.secondHalfPizzaEndSpecial2.length
					? order.secondHalfPizzaEndSpecial2
					: null,
			],
			[
				order.secondHalfPizzaExtraToppingsEndSpecial2.length
					? 'Pizza 2 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsEndSpecial2.length
					? order.secondHalfPizzaExtraToppingsEndSpecial2.join(', ')
					: null,
			],
			[
				order.pizzaEndSpecial3 ? 'Pizza 3' : null,
				order.pizzaEndSpecial3 ? order.pizzaEndSpecial3 : null,
			],
			[
				order.pizzaEndSpecial3 && order.baseEndSpecial3 ? 'Pizza 3 Base' : null,
				order.pizzaEndSpecial3 && order.baseEndSpecial3
					? order.baseEndSpecial3
					: null,
			],
			[
				order.extraToppingsEndSpecial3.length ? 'Pizza 3 Extra toppings' : null,
				order.extraToppingsEndSpecial3.length
					? order.extraToppingsEndSpecial3.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaEndSpecial3.length ? 'Pizza 3 Second half' : null,
				order.secondHalfPizzaEndSpecial3.length
					? order.secondHalfPizzaEndSpecial3
					: null,
			],
			[
				order.secondHalfPizzaExtraToppingsEndSpecial3.length
					? 'Pizza 3 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsEndSpecial3.length
					? order.secondHalfPizzaExtraToppingsEndSpecial3.join(', ')
					: null,
			],
			['Drink', order.drinkChoice],
			[
				order.upgradeDrinks.length ? 'Drink Upgrade' : null,
				order.upgradeDrinks.length ? order.upgradeDrinks.join(', ') : null,
			],
		];
		return pizzaEndSpecialDetails;
	};

	const getPizzaSpecialDetails = (order) => {
		const pizzaSpecialDetails = [
			['Choice of Size', order.size],
			['Choice of Pizza', order.pizzaChoice],
			['Choice of Extra Topping', order.extraToppings],
		];
		return pizzaSpecialDetails;
	};

	const getDrinkDetails = (order) => [[null, order.drinkChoice]];

	const getPastaDetails = (order) => {
		const pastaDetails = [
			['Choice of Pasta', order.pastaChoice],
			[
				'Extra Toppings',
				order.extraToppings.length ? order.extraToppings.join(', ') : '-',
			],
		];
		return pastaDetails;
	};

	const getPizzaDetails = (order) => {
		const sizeInches = {
			small: 10,
			large: 13,
			family: 15,
		};
		const pizzaDetails = [
			['Choice of Size', `${order.size} ${sizeInches[order.size]}"`],
			['Choice of Base', order.base],
			[
				order.extraToppings.length ? 'Extra Toppings' : null,
				order.extraToppings.length ? order.extraToppings.join(', ') : null,
			],
			[
				order.secondHalf.length ? 'Choice of Second Half' : null,
				order.secondHalf.length ? order.secondHalf[0] : null,
			],
			[
				order.secondHalfExtraToppings.length
					? 'Second Half Extra Toppings'
					: null,
				order.secondHalfExtraToppings.length
					? order.secondHalfExtraToppings.join(', ')
					: null,
			],
		];
		return pizzaDetails;
	};
	const getPizzaComboTestSpecialDetails = (order) => {
		const pizzaDetails = [
			['Pizza 1', order.pizzaCombo1],
			[
				order.pizzaCombo1 && order.baseCombo1 ? 'Pizza 1 Base' : null,
				order.pizzaCombo1 && order.baseCombo1 ? order.baseCombo1 : null,
			],
			[
				order.extraToppingsCombo1.length ? 'Pizza 1 Extra toppings' : null,
				order.extraToppingsCombo1.length
					? order.extraToppingsCombo1.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaCombo1.length ? 'Pizza 1 Second half' : null,
				order.secondHalfPizzaCombo1.length ? order.secondHalfPizzaCombo1 : null,
			],
			[
				order.secondHalfPizzaExtraToppingsCombo1.length
					? 'Pizza 1 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsCombo1.length
					? order.secondHalfPizzaExtraToppingsCombo1.join(', ')
					: null,
			],
			[
				order.pizzaCombo2 ? 'Pizza 2' : null,
				order.pizzaCombo2 ? order.pizzaCombo2 : null,
			],
			[
				order.pizzaCombo2 && order.baseCombo2 ? 'Pizza 2 Base' : null,
				order.pizzaCombo2 && order.baseCombo2 ? order.baseCombo2 : null,
			],
			[
				order.extraToppingsCombo2.length ? 'Pizza 2 Extra toppings' : null,
				order.extraToppingsCombo2.length
					? order.extraToppingsCombo2.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaCombo2.length ? 'Pizza 2 Second half' : null,
				order.secondHalfPizzaCombo2.length ? order.secondHalfPizzaCombo2 : null,
			],
			[
				order.secondHalfPizzaExtraToppingsCombo2.length
					? 'Pizza 2 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsCombo2.length
					? order.secondHalfPizzaExtraToppingsCombo2.join(', ')
					: null,
			],
			[
				order.pizzaCombo3 ? 'Pizza 3' : null,
				order.pizzaCombo3 ? order.pizzaCombo3 : null,
			],
			[
				order.pizzaCombo3 && order.baseCombo3 ? 'Pizza 3 Base' : null,
				order.pizzaCombo3 && order.baseCombo3 ? order.baseCombo3 : null,
			],
			[
				order.extraToppingsCombo3.length ? 'Pizza 3 Extra toppings' : null,
				order.extraToppingsCombo3.length
					? order.extraToppingsCombo3.join(', ')
					: null,
			],
			[
				order.secondHalfPizzaCombo3.length ? 'Pizza 3 Second half' : null,
				order.secondHalfPizzaCombo3.length ? order.secondHalfPizzaCombo3 : null,
			],
			[
				order.secondHalfPizzaExtraToppingsCombo3.length
					? 'Pizza 3 Second Half Extra toppings'
					: null,
				order.secondHalfPizzaExtraToppingsCombo3.length
					? order.secondHalfPizzaExtraToppingsCombo3.join(', ')
					: null,
			],
			['Drink', order.drinkChoice],
			[
				order.upgradeDrinks.length ? 'Drink Upgrade' : null,
				order.upgradeDrinks.length ? order.upgradeDrinks.join(', ') : null,
			],
		];
		return pizzaDetails;
	};

	const renderOrderDetails = (order) => {
		const dishTypes = {
			pizza: () => getPizzaDetails(order),
			gourmet: () => getPizzaDetails(order),
			pasta: () => getPastaDetails(order),
			drink: () => getDrinkDetails(order),
			pizzaspecial: () => getPizzaSpecialDetails(order),
			pizzaendspecial: () => getPizzaEndSpecialDetails(order),
			pizzacombospecial: () => getPizzaComboSpecialDetails(order),
			testspecial: () => getPizzaComboTestSpecialDetails(order),
		};
		const details = dishTypes[order.dishType];
		return (
			<Box w={['100%', '100%', '100%', '300px']} textTransform="capitalize">
				<Text fontSize="1.5em">{order.name}</Text>
				{details &&
					details().map((detail, index) => (
						<span key={index}>
							<Text fontSize="1.2rem">{detail[0]}</Text>
							{detail[1] && (
								<Text fontSize="0.95rem" color="grey" mb="2">
									{detail[1]}
								</Text>
							)}
						</span>
					))}
			</Box>
		);
	};
	const renderOrderTotalPrice = (order) => {
		return (
			<Text fontSize="1.2rem" mx="3">
				{priceFormatter(order.currentPrice * order.quantity)}
			</Text>
		);
	};
	const renderOrderQuantityController = (orderIndex) => {
		return (
			<Flex mx="10px">
				<IconButton
					backgroundColor="#FCA401"
					color="white"
					borderRadius="full"
					boxShadow="md"
					onClick={() => decreaseQuanity(orderIndex)}
					icon={<MinusIcon />}
				/>
				<Flex align="center" w="100px">
					<Text mx="5" fontSize="1.2rem" align="center" w="100%">
						{orders[orderIndex].quantity}
					</Text>
				</Flex>
				<IconButton
					backgroundColor="#2CC30F"
					color="white"
					borderRadius="full"
					boxShadow="md"
					onClick={() => increaseQuanity(orderIndex)}
					icon={<AddIcon />}
				/>
			</Flex>
		);
	};
	const renderOrderDeleteButton = (order) => {
		return (
			<Box as="button" onClick={() => deleteOrder(order)}>
				<DeleteIcon boxSize="8" color="red" />
			</Box>
		);
	};
	return (
		<>
			<Box px="10px">
				{!orders.length ? (
					<Text align="center" color="grey" fontSize="20">
						Opps, your cart is empty.
					</Text>
				) : (
					orders.map((order, index) => (
						<Box key={index}>
							<Flex direction="row" mb="5">
								<VStack align="center" spacing="20px">
									<Box display={['block', 'block', 'block', 'none']}>
										{renderOrderDetails(order)}
									</Box>
									<Flex
										align="center"
										justify={['space-around', 'space-around', 'start']}
										w="80vw"
									>
										<Box display={['block', 'block', 'none']}>
											{renderOrderQuantityController(index)}
										</Box>
										<Box display={['block', 'block', 'none']}>
											{renderOrderTotalPrice(order)}
										</Box>
										<Box display={['block', 'block', 'none']}>
											{renderOrderDeleteButton(order)}
										</Box>
									</Flex>
								</VStack>
							</Flex>
							<Flex justify="space-between" align="center" mb="8">
								<Flex
									direction="column"
									align={'center'}
									ml="5"
									display={['none', 'none', 'none', 'block']}
								>
									{renderOrderDetails(order)}
								</Flex>
								<Flex mx="3" h="10" display={['none', 'none', 'block']}>
									{renderOrderQuantityController(index)}
								</Flex>
								<Box display={['none', 'none', 'block']} w="150px">
									{renderOrderTotalPrice(order)}
								</Box>
								<Box display={['none', 'none', 'block']}>
									{renderOrderDeleteButton(order)}
								</Box>
							</Flex>
							{index !== orders.length - 1 ? (
								<Divider my="3" borderColor="#c2c2c2" />
							) : null}
						</Box>
					))
				)}
			</Box>
		</>
	);
};

export default OrderList;
