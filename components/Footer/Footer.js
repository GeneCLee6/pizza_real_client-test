import { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Box, Flex, Icon, Button, Text, Circle } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalProvider";
import { priceFormatter } from "../../utils/helper";
const Footer = ({ onOpen }) => {
	const {
		contextValue: { totalPrice, totalQuantity },
	} = useContext(GlobalContext);
	const router = useRouter();

	const handleOrder = () => {
		router.push(`/checkout`, undefined, { shallow: true });
	};

	const handleClickCart = () => {
		if (!totalPrice) return;
		onOpen();
	};

	return (
		<Flex flexDir="column" width="100%">
			<Flex height="60px" pt="8px" px="16px" w="100%" justify="space-between">
				<Flex pos="relative">
					<Box as="button" onClick={handleClickCart}>
						<Icon
							as={FiShoppingCart}
							w="40px"
							h="30px"
							color={totalPrice ? "red.500" : "gray.400"}
						/>
					</Box>

					{totalQuantity ? (
						<Circle
							w="4"
							h="4"
							bgColor="yellow.300"
							color="black"
							rounded="full"
							pos="absolute"
							top="0"
							left="34px"
							fontSize="10px"
						>
							{totalQuantity}
						</Circle>
					) : null}

					<Text
						as="span"
						pl="10px"
						pt="6px"
						fontSize="16px"
						fontWeight="700"
						color={totalPrice ? "white" : "gray.400"}
					>
						{totalPrice ? priceFormatter(totalPrice) : <>Pending Order</>}
					</Text>
				</Flex>
				<Button
					_hover={
						totalPrice
							? { bgColor: "red.500", color: "white" }
							: { bgColor: "gray.500", color: "gray.400" }
					}
					_active={
						totalPrice
							? { bgColor: "red.500", color: "white" }
							: { bgColor: "gray.500", color: "gray.400" }
					}
					bgColor={totalPrice ? "red.500" : "gray.500"}
					color={totalPrice ? "white" : "gray.400"}
					disabled={!totalPrice}
					onClick={handleOrder}
				>
					ORDER NOW
				</Button>
			</Flex>
		</Flex>
	);
};

export default Footer;
