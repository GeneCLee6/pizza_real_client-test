import {
	Box,
	Text,
	Flex,
	Divider,
	RadioGroup,
	VStack,
	Radio,
	Spacer,
	Link,
	Center,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	useDisclosure,
	ModalBody,
	Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import AddressForm from "./AddressForm";
import OrderList from "./OrderList";
import PaymentSuccess from "./PaymentSuccess";
import PaypalCheckout from "./PaypalCheckout";
import { DeliveryFees } from "../../configs/constants";
import { GlobalContext } from "../../contexts/GlobalProvider";
import useOperations from "../../hooks/useOperation";
import { requestCreateOrder } from "../../services/orders";

const Checkout = () => {
	const {
		contextValue: { cart, totalPrice },
		clearCart,
	} = useContext(GlobalContext);
	const [isMounted, setIsMounted] = useState(false);
	const [shoppingOption, setShoppingOption] = useState("delivery");
	const [subtotal, setSubtotal] = useState(0);
	const [shippingFee, setShippingFee] = useState(0);
	const [isOnCheckout, setIsOnCheckout] = useState(false);
	const [checkoutActions, setCheckoutActions] = useState(null);
	const [isEmptyCart, setIsEmptyCart] = useState(true);
	const [isValidAddressForm, setIsValidAddressForm] = useState(false);
	const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
	const [isShowSuccess, setIsShowSuccess] = useState(false);
	const [deliveryRequirement, setDeliveryRequirement] = useState(null);
	const [AlertContent, setAlertContent] = useState("");
	const [orderNumber, setOrderNumber] = useState(null);
	const [prepareTime, setPrepareTime] = useState([]);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [comment, setComment] = useState("");
	const [address, setAddress] = useState("");
	const [suburb, setSuburb] = useState("");
	const { currentOperation } = useOperations();
	const [isOnline, setIsOnline] = useState(true);
	const pickupOptionDescription = `Current pickup time is about ${
		currentOperation && currentOperation[0].pickupTime[0]
	} - ${currentOperation && currentOperation[0].pickupTime[1]} minutes`;
	const deliveryOptionDescription = `Current delivery time is about ${
		currentOperation && currentOperation[0].deliverTime[0]
	} - ${currentOperation && currentOperation[0].deliverTime[1]} minutes`;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChangeAddressForm = (form) => {
		const addressForm = Object.assign({}, form);
		setName(`${addressForm.firstName} ${addressForm.lastName}`);
		setPhone(addressForm.phone);
		setEmail(addressForm.email);
		setComment(addressForm.comment);

		const suburb = addressForm.suburb;
		if (suburb) {
			setDeliveryRequirement(
				DeliveryFees.find((r) =>
					r.suburbs.map((s) => s.toLowerCase()).includes(suburb.toLowerCase()),
				),
			);
			setSuburb(suburb);
			setAddress(addressForm.address);
		}
		// const suburb = addressForm.addressData?.district
		// 	? addressForm.addressData?.district
		// 	: addressForm.addressData?.suburb;
		// if (suburb) {
		// 	setDeliveryRequirement(
		// 		DeliveryFees.find((r) =>
		// 			r.suburbs.map((s) => s.toLowerCase()).includes(suburb.toLowerCase())
		// 		)
		// 	);

		// 	setSuburb(suburb);
		// 	setAddress(addressForm.address);
		// }
	};

	useEffect(() => {
		if (deliveryRequirement && shoppingOption === "delivery")
			setShippingFee(deliveryRequirement.deliverFee);
	}, [deliveryRequirement, shoppingOption]);

	useEffect(() => {
		if (!isMounted) {
			setSuburb("");
			setIsMounted(true);
		}
		if (checkoutActions && !isCheckoutComplete) {
			if (shoppingOption === "delivery") {
				if (currentOperation) setPrepareTime(currentOperation[0].deliverTime);
				if (subtotal < deliveryRequirement?.minOrderCost && address) {
					setAlertContent("minOrder");
					onOpen();
				}
				if (!deliveryRequirement && address) {
					setAlertContent("outerSuburb");
					onOpen();
				}
				if (
					isValidAddressForm &&
					!isEmptyCart &&
					deliveryRequirement &&
					subtotal >= deliveryRequirement.minOrderCost
				) {
					setShippingFee(deliveryRequirement.deliverFee);
					setIsOnCheckout(true);

					try {
						checkoutActions.enable();
					} catch (error) {
						console.log(error);
					}
				} else if (isOnCheckout) checkoutActions.disable();
				return;
			}

			if (shoppingOption === "pickup") {
				setAddress("");
				setSuburb("");
				if (currentOperation) setPrepareTime(currentOperation[0].pickupTime);
				setShippingFee(0);
				if (isValidAddressForm && !isEmptyCart) {
					setIsOnCheckout(true);
					try {
						checkoutActions.enable();
					} catch (error) {
						console.log(error);
					}
				} else if (isOnCheckout) checkoutActions.disable();
				return;
			}

			return;
		}

		const onCheckoutComplete = () => {
			const order = {
				status: "pending",
				isPaid: true,
				payMethod: "payPal",
				orderType: shoppingOption === "pickup" ? "pick up" : shoppingOption,
				totalPrice: totalPrice + shippingFee,
				comment,
				deliveryFee: shippingFee.toFixed(2),
				address,
				suburb,
				phone,
				email,
				name,
				coupon: "",
				readyTime1:
					shoppingOption === "pickup"
						? currentOperation[0].pickupTime[0]
						: currentOperation[0].deliverTime[0],
				readyTime2:
					shoppingOption === "pickup"
						? currentOperation[0].pickupTime[1]
						: currentOperation[0].deliverTime[1],
				dishes: cart.map((c) => ({
					...c,
					base: c.base ? c.base : "",
					size: c.size ? c.size : "",
					pastaChoice: c.pastaChoice ? c.pastaChoice.toLowerCase() : "",
					secondHalf: c.secondHalf.length
						? c.secondHalf[0]
						: "No Second half pizza",
					secondHalfPizzaEndSpecial1: c.secondHalfPizzaEndSpecial1.length
						? c.secondHalfPizzaEndSpecial1[0]
						: "No Second half pizza",
					secondHalfPizzaEndSpecial2: c.secondHalfPizzaEndSpecial2.length
						? c.secondHalfPizzaEndSpecial2[0]
						: "No Second half pizza",
					secondHalfPizzaEndSpecial3: c.secondHalfPizzaEndSpecial3.length
						? c.secondHalfPizzaEndSpecial3[0]
						: "No Second half pizza",
					secondHalfPizzaCombo1: c.secondHalfPizzaCombo1.length
						? c.secondHalfPizzaCombo1[0]
						: "No Second half pizza",
					secondHalfPizzaCombo2: c.secondHalfPizzaCombo2.length
						? c.secondHalfPizzaCombo2[0]
						: "No Second half pizza",
					secondHalfPizzaCombo3: c.secondHalfPizzaCombo3.length
						? c.secondHalfPizzaCombo3[0]
						: "No Second half pizza",
					price: c.currentPrice,
				})),
			};
			const getNum = async () => {
				const res = await requestCreateOrder(order);
				setOrderNumber(res.orderNum);
			};
			getNum();
			setIsShowSuccess(true);
			setIsCheckoutComplete(false);
			clearCart();
		};
		if (isCheckoutComplete) {
			onCheckoutComplete();
			setIsOnCheckout(false);
		}
	}, [
		checkoutActions,
		cart,
		isValidAddressForm,
		deliveryRequirement,
		isCheckoutComplete,
		isMounted,
		shoppingOption,
		currentOperation,
		subtotal,
		isEmptyCart,
		isOnCheckout,
		onOpen,
		totalPrice,
		shippingFee,
		address,
		phone,
		email,
		name,
		clearCart,
		comment,
		orderNumber,
		suburb,
	]);
	return isShowSuccess ? (
		<PaymentSuccess
			orderNumber={orderNumber}
			shoppingOption={shoppingOption}
			prepareTime={prepareTime}
		/>
	) : (
		<>
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
						_focus={{ boxShadow: "none" }}
						zIndex="2"
					/>

					<ModalBody px={0}>
						<VStack>
							<Alert status="error" display="block">
								<AlertIcon />
								{AlertContent === "minOrder" ? (
									<>
										<AlertTitle>
											We couldn&apos;t checkout your order.
										</AlertTitle>
										<AlertDescription>
											Less than the minimum order.
										</AlertDescription>
									</>
								) : (
									<>
										<AlertTitle>
											We couldn&apos;t checkout your order.
										</AlertTitle>
										<AlertDescription>Out of Delivery Area.</AlertDescription>
									</>
								)}
							</Alert>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Flex direction="column" justify="center">
				<Flex backgroundColor={"black"} justify="center">
					<Box w="1800px">
						<Box w="100%" px={["5px", "10px", "40px", "150px"]}>
							<Header />
						</Box>
					</Box>
				</Flex>
				{/* px={["3", "5", "10", "50", "80px"]} */}
				<Flex justify="center">
					<Box py="60px" maxW="100%">
						<Box p={4}>
							<Box>
								<Text align="center" fontSize="40">
									Your Cart
								</Text>
								<Center>
									<NextLink href="/menu" passHref>
										<Link color="#EF3232"> Continue Shopping</Link>
									</NextLink>
								</Center>
							</Box>
							<Divider mt="10" mb="2" borderColor="#828282" />
							<Flex justify="center">
								<OrderList
									subtotal={(subtotal) => setSubtotal(subtotal)}
									isEmptyCart={(e) => setIsEmptyCart(e)}
								/>
							</Flex>
							<Divider mt="5" mb="12" borderColor="#828282" />
							<Flex
								direction={["column", "column", "column", "row"]}
								align="flex-start"
							>
								<Box>
									<Box w={["100%", "100%", "90%", "80%"]}>
										<AddressForm
											onChange={onChangeAddressForm}
											isOnCheckout={isOnCheckout}
											errorsCount={(count) => setIsValidAddressForm(count <= 0)}
											shoppingOption={shoppingOption}
											setIsOnline={setIsOnline}
										/>
									</Box>

									<Box mt="80px" display={["none", "none", "none", "block"]}>
										<Flex direction="column">
											<Text color="red" fontWeight="bold" fontSize="lg">
												Note:&nbsp;
											</Text>
											<Text fontSize="lg">
												{shoppingOption === "delivery"
													? deliveryOptionDescription
													: pickupOptionDescription}
											</Text>
											{shoppingOption === "delivery" && suburb && (
												<Text fontSize="lg">
													Current Area minimum order is $
													{deliveryRequirement?.minOrderCost}
												</Text>
											)}
										</Flex>
									</Box>
								</Box>
								<Box
									w={["100%", "100%", "100%", "40%"]}
									my={["10", "10", "10", "0"]}
									py="5"
									px="3"
									borderRadius="20px"
									backgroundColor="white"
									borderColor="grey"
									borderWidth="1px"
									boxShadow="lg"
								>
									<RadioGroup
										value={shoppingOption}
										onChange={setShoppingOption}
									>
										<VStack>
											<Radio value="delivery">
												<Text fontWeight="700" fontSize="20px">
													Delivery
												</Text>
											</Radio>
											<Radio value="pickup">
												<Text fontWeight="700" fontSize="20px">
													Pickup
												</Text>
											</Radio>
										</VStack>
									</RadioGroup>
									<Flex direction="column" px="8px" my="5">
										<Flex>
											<Text>Subtotal</Text>
											<Spacer />
											<Text w="100px">$ {subtotal.toFixed(2)}</Text>
										</Flex>
										<Spacer />
										<Flex>
											<Text>Shipping Fee</Text>
											<Spacer />
											<Text w="100px">$ {shippingFee.toFixed(2)}</Text>
										</Flex>
										<Spacer />
										<Flex>
											<Text>Total</Text>
											<Spacer />
											<Text w="100px">
												$ {(subtotal + shippingFee).toFixed(2)}
											</Text>
										</Flex>
									</Flex>
									<Box px="5px">
										<PaypalCheckout
											shippingSuburb={suburb}
											checkoutActions={(e) => setCheckoutActions(e)}
											isPaymentSuccess={(e) => setIsCheckoutComplete(e)}
											shippingFee={shippingFee}
											shoppingOption={shoppingOption}
										/>
									</Box>
								</Box>
								<Box display={["block", "block", "block", "none"]} mt="5">
									<Flex justify="center" direction="column">
										<Text color="red" fontWeight="bold" fontSize="lg">
											Note:&nbsp;
										</Text>
										<Text fontSize="lg">
											{shoppingOption === "delivery"
												? deliveryOptionDescription
												: pickupOptionDescription}
											.
										</Text>
										<Text fontSize="lg">
											Current Area minimum order is{" "}
											{deliveryRequirement?.minOrderCost}
										</Text>
									</Flex>
								</Box>
							</Flex>
						</Box>
					</Box>
				</Flex>
			</Flex>
		</>
	);
};

export default Checkout;
