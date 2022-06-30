import {
	Box,
	Grid,
	GridItem,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import ChakraNextImage from "../UI/ChakraNextImage";
import { useState } from "react";
import { priceFormatter } from "../../utils/helper";
import DishDetail from "./DishDetail";

const MenuItemsLayout = ({ category, menuItems }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [menuItem, setMenuItem] = useState(0);
	const onAddToCart = () => {
		onClose();
	};
	const onOpenMenuPopup = (menuItem) => {
		setMenuItem(menuItem);
		onOpen();
	};
	const hideMenu = (item) => {
		if (item.toLowerCase() === "no second half pizza") {
			return null;
		} else {
			return item;
		}
	};
	return (
		<>
			<Grid
				templateColumns={[
					"repeat(1, 1fr)",
					"repeat(2, 1fr)",
					"repeat(2, 1fr)",
					"repeat(3, 1fr)",
					"repeat(3, 1fr)",
					"repeat(4, 1fr)",
				]}
				gap={6}
			>
				{menuItems.map((menuItem) => {
					const { _id, name, prices, photo } = menuItem;

					return (
						<>
							{hideMenu(name) !== null && (
								<GridItem
									key={_id}
									w="100%"
									h={{ base: "160px", md: "240px" }}
									mb={{ base: "50px", md: "80px" }}
									cursor="pointer"
									onClick={() => onOpenMenuPopup(menuItem)}
								>
									{photo && (
										<Box w="100%" h="100%" position="relative">
											<ChakraNextImage
												src={photo}
												layout="fill"
												rounded="10px"
											/>
										</Box>
									)}

									<Text
										fontWeight="bold"
										fontSize={{ base: "md", md: "lg" }}
										textTransform="capitalize"
									>
										{name}
									</Text>
									<Text fontSize={{ base: "sm", md: "md" }}>
										{priceFormatter(prices[0])}
									</Text>
								</GridItem>
							)}
						</>
					);
				})}
			</Grid>
			<Modal motionPreset="scale" onClose={onClose} isOpen={isOpen} size="2xl">
				<ModalOverlay />
				<ModalContent mx="30px">
					<ModalCloseButton
						borderRadius="50px"
						backgroundColor="gray.300"
						_focus={{ boxShadow: "none" }}
						zIndex="2"
					/>
					{menuItem?.photo ? (
						<Box w="100%">
							<ChakraNextImage
								layout="responsive"
								width="120px"
								height="80px"
								src={menuItem?.photo}
								alt="img"
							/>
						</Box>
					) : null}
					<ModalBody px="2px">
						<DishDetail
							dish={menuItem}
							category={category}
							onCartClose={onClose}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default MenuItemsLayout;
