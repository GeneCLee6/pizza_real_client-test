import { useEffect, useState, useContext, useRef } from 'react';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Text,
	Flex,
} from '@chakra-ui/react';
import { GlobalContext } from '../../contexts/GlobalProvider';

const PaypalCheckout = ({
	checkoutActions,
	isPaymentSuccess,
	shippingSuburb,
	shoppingOption,
}) => {
	const {
		contextValue: { cart },
		clearCart,
	} = useContext(GlobalContext);
	const [error, setError] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const paypalRef = useRef(null);

	const purchaseDetails = {
		items: cart,
		shippingSuburb,
		shoppingOption,
	};

	const getPaypalButton = () =>
		paypal.Buttons({
			onInit: function (data, actions) {
				actions.disable();
				checkoutActions(actions);
			},
			onClick: function () {},
			createOrder: async function () {
				return fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/orders/paypalPayment`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(purchaseDetails),
					}
				)
					.then((res) => {
						if (res.ok) return res.json();
						return res.json().then((json) => Promise.reject(json));
					})
					.then((data) => {
						if (data.code === 403) {
							setError(data.msg);
							onOpen();
							return;
						}
						return data.id;
					})
					.catch((e) => {
						setError(e);
						onOpen();
					});
			},
			onApprove: function (data, actions) {
				return actions.order.capture().then(async (details) => {
					isPaymentSuccess(true);
					setShippingSuburb('');
				});
			},
			onError: function (err) {
				setError(err);
				onOpen();
			},
		});

	useEffect(() => {
		const paypalButton = getPaypalButton();
		paypalButton.render('#paypal');
		if (paypalRef.current.children.length > 1) {
			paypalRef.current.removeChild(paypalRef.current.children[0]);
		}
	}, [shippingSuburb, shoppingOption]);

	return (
		<>
			<div id="paypal" ref={paypalRef}></div>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Opps, something went wrong</ModalHeader>
					<ModalCloseButton />
					<ModalBody py="10">
						<Flex align="center" justify="center">
							<Text color="red" fontSize="xl">
								{error.toString()}
							</Text>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaypalCheckout;
