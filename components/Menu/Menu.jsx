import {
	Heading,
	Box,
	Link,
	Flex,
	useDisclosure,
	Text,
} from "@chakra-ui/react";
import MenuItemsLayout from "./MenuItemsLayout";
import { useMenu } from "../../hooks/useDish";
import Footer from "../Footer";
import Header from "../Header";
import { useState, useEffect } from "react";
import { OpeningHours } from "../../configs/constants";

const Menu = () => {
	const { data: menu } = useMenu();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentTabIndex, setCurrentTabIndex] = useState(0);
	const day = new Date().getDay();
	const hour = new Date().getHours();
	const minute = new Date().getMinutes();
	const showSpecial = (item) => {
		const week = new Date().getDay();

		// if (item === "Friday & Saturday Specials" && week !== 5 && week !== 6) {
		// 	return null;
		// } else

		if (
			item === "Sunday-Thursday Combo Special" &&
			(week === 5 || week === 6)
		) {
			return null;
		} else if (item === "pick-up special" && week >= 4 && week <= 6) {
			//	} else if (item === "pick-up special" && week !== 5 && week !== 6) {
			return null;
		} else if (item === "Combo Test" || item === "Combo Test1") {
			return null;
		} else {
			return item;
		}
	};
	useEffect(() => {
		const onScroll = () => {
			menu?.forEach(({ category }, index) => {
				const tabElement = document.getElementById(category);
				const bounding = tabElement?.getBoundingClientRect();

				if (
					bounding?.top >= 0 &&
					bounding.top <= 80 &&
					bounding.left >= 0 &&
					bounding.right <= window.innerWidth &&
					bounding.bottom <= window.innerHeight
				) {
					setCurrentTabIndex(index);
				}
			});
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	});

	return (
		<>
			<Flex backgroundColor={"black"} justify="center">
				<Box w="1800px">
					<Box w="100%" px={["5px", "10px", "40px", "150px"]}>
						<Header />
					</Box>
				</Box>
				{/* red error */}
			</Flex>
			{(hour < OpeningHours[day].mode24[0].hour ||
				hour > OpeningHours[day].mode24[1].hour ||
				(hour == OpeningHours[day].mode24[0].hour &&
					minute < OpeningHours[day].mode24[0].minute) ||
				(hour == OpeningHours[day].mode24[1].hour &&
					minute > OpeningHours[day].mode24[1].minute)) && (
				<Box
					px={["5px", "10px", "40px", "150px"]}
					margin="30px auto"
					maxW="1800px"
				>
					<Text
						color="red"
						fontSize={{ base: "24px", md: "30px" }}
						textAlign="center"
					>
						<strong>
							Our Opening Hours： {OpeningHours[day].mode12[0]} -{" "}
							{OpeningHours[day].mode12[1]}
						</strong>
					</Text>
				</Box>
			)}

			<Box
				position="relative"
				px={["5px", "10px", "40px", "150px"]}
				margin="auto"
				maxW="1800px"
			>
				<Flex marginLeft={{ base: "120px", sm: "200px", md: "250px" }}>
					<Box
						h="100%"
						pt="20px"
						px={{ base: "8px", md: "24px" }}
						minW={{ base: "88px", md: "250px" }}
						maxW={{ base: "100px", sm: "150px", md: "250px" }}
						transform="translateX(-100%)"
						position="fixed"
						overflowY="auto"
					>
						{menu?.map(({ category }, index) => (
							<>
								{showSpecial(category) === null ? null : (
									<Link key={category} href={`#${category}`}>
										<Heading
											w="100%"
											align="start"
											size={{ base: "16px", md: "20px" }}
											mb="4"
											textTransform="capitalize"
											fontWeight={currentTabIndex === index ? "700" : "500"}
											textDecoration={
												currentTabIndex === index ? "underline" : "none"
											}
											textDecorationThickness={
												currentTabIndex === index ? "3px" : "none"
											}
											onClick={() => setCurrentTabIndex(index)}
										>
											{category}
										</Heading>
									</Link>
								)}
							</>
						))}
					</Box>

					<Box pr="5" pt={{ base: "16px", md: "40px" }} w="100%" mb="600px">
						{menu?.map(({ category, menuItems }) => (
							<>
								{showSpecial(category) === null ? null : (
									<Box key={category} mb="50px">
										<Heading
											fontSize={{ base: "24px", md: "30px" }}
											mb={{ base: "16px", md: "32px" }}
											id={category}
											textTransform="capitalize"
										>
											{category}
										</Heading>
										<MenuItemsLayout
											category={category}
											menuItems={menuItems}
										/>
									</Box>
								)}
							</>
						))}
					</Box>
				</Flex>
			</Box>
			<Flex
				backgroundColor="gray.700"
				w="100%"
				pos="fixed"
				bottom={0}
				justify="center"
			>
				<Box w="1800px">
					<Box px={["5px", "10px", "40px", "150px"]} backgroundColor="gray.700">
						<Footer onOpen={onOpen} />
					</Box>
				</Box>
			</Flex>
		</>
	);
};

export default Menu;
