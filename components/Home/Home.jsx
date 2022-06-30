import { Heading, Flex, Box, Text, Spacer, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import Carousel from "./Carousel";
import ChakraNextImage from "../UI/ChakraNextImage";
import MainFooter from "../MainFooter";
import { DeliveryPostCodes, DeliveryFees } from "../../configs/constants";
import { priceFormatter } from "../../utils/helper";
import Header from "../Header";
const Home = () => {
	const images = ["/image/coupons.jpg", "/image/pickup-special.jpg"];
	const newProductImgLinks = [
		"https://i.pinimg.com/originals/49/0d/f8/490df82dc5c8f79bf3e43935aff0ecf0.jpg",
		"https://asset-cdn.campaignbrief.com/wp-content/uploads/2018/10/04152808/Pizza2.jpg",
		"https://mir-s3-cdn-cf.behance.net/project_modules/disp/18126f16195189.562a6a3d9b444.jpg",
	];
	const cards = [
		{
			image: "/image/menu.png",
			label: "Our Menu",
			href: "/menu",
		},
		{
			image: "/image/special.png",
			label: "Special Discount",
			href: "/",
		},
		{
			image: "/image/delivery.png",
			label: "Order Online",
			href: "/",
		},
	];

	const aboutUsTexts = [
		{
			title: "Napoletana pizza house established since 1985",
			subtitle: `Since the years, our commitment to delivering the very best has
      remained the same. That's our recipe for sucess.`,
		},
		{
			title: "Passion",
			subtitle: `We make the best home made pizzas & pastas with fresh local
      quality ingredients. True quality starts with the ingredients.`,
		},
		{
			title: "Continuous Improvement",
			subtitle: `We try new things and learn from our mistake in order to improve
      our customer services`,
		},
		{
			title: "Community",
			subtitle: `We proudly support local community such as Quiz night for
      Bellerive primary school and Lindisfarne football club.`,
		},
	];
	const deliveryInformation = {
		areas: {
			postCode: DeliveryPostCodes,
		},
		costInfo: DeliveryFees.map((fee) => ({
			cost: priceFormatter(fee.deliverFee),
			areas: fee.suburbs,
			note: `*${fee.minOrderCost} minimum order`,
		})),
	};
	const tradingHours = [
		{
			day: "Monday",
			time: "5 ~ 8.30 pm",
		},

		{
			day: "Tuesday",
			time: "5 ~ 8.30 pm",
		},
		{
			day: "Wednesday",
			time: "5 ~ 9.00 pm",
		},
		{
			day: "Thursday",
			time: "5 ~ 9.00pm",
		},
		{
			day: "Friday",
			time: "5 ~ 10.00pm",
		},
		{
			day: "Saturday",
			time: "5 ~ 10.00pm",
		},
		{
			day: "Sunday",
			time: "5 ~ 8.30pm",
		},
	];

	return (
		<Box
			border="0.1px solid transparent"
			backgroundImage="url('/image/background.jpg')"
			backgroundPosition="center"
			backgroundSize="cover"
		>
			{/* <NextImage src="/image/background.jpg" layout="fill" zIndex="-100" /> */}
			<Flex backgroundColor={"black"} justify="center">
				<Box w="1800px">
					<Box w="100%" px={["5px", "10px", "40px", "150px"]}>
						<Header />
					</Box>
				</Box>
			</Flex>
			<Flex
				px={["5px", "10px", "40px", "150px"]}
				maxW="1800px"
				direction="column"
				mx="auto"
				position={"relative"}
			>
				<Box h={["100px", "200px", "350px"]} position="relative">
					<Carousel images={images} timeInterval="3000" w="100%" h="100%" />
				</Box>
				<Box my={10} display="flex" justifyContent="center" maxW="100%">
					<Flex
						justify={"space-between"}
						direction={["column", "column", "row"]}
						w="100%"
					>
						{cards.map((card, index) => (
							<NextLink href={card.href} passHref key={index}>
								<Flex
									my={["10px", "10px", "auto"]}
									maxW={{ base: "100%", md: "500px" }}
									minW={{ base: "100%", md: "30%" }}
									h={["150px", "150px", "200px"]}
									backgroundColor="rgba(0, 0, 0, 0.5)"
									borderRadius="lg"
									color="white"
									cursor="pointer"
									direction="column"
									alignItems="center"
									justifyContent="center"
									key={index}
								>
									<Box h="100px" w="150px" position="relative">
										<ChakraNextImage
											layout="fill"
											src={card.image}
											style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
										/>
									</Box>
									<Text
										fontSize={{ base: "md", md: "xl", lg: "2xl" }}
										fontWeight="700"
									>
										{card.label}
									</Text>
								</Flex>
							</NextLink>
						))}
					</Flex>
				</Box>

				<Box bg="#E23838" w="100%" py="12" color="white">
					<Heading
						size="xl"
						align="center"
						fontFamily="Playfair Display"
						fontStyle="italic"
						fontWeight="700"
					>
						&quot;We Make The Best Home Made Pizzas & Pastas with Fresh Quality
						Ingredients&quot;
					</Heading>
				</Box>
				{/* <Box
					h={["380px", "450px", "850px"]}
					mt={["30px", "40px", "50px"]}
					position="relative"
				>
					<Carousel
						images={newProductImgLinks}
						timeInterval="2000"
						w={["100%"]}
						h="550px"
					/>
				</Box> */}
				<Box my="10" id="about">
					<Flex justify="center" mb="10">
						<Box
							w="30%"
							h="auto"
							mr="2"
							position="relative"
							display={["none", "none", "block"]}
						>
							<ChakraNextImage src="/image/man-cut-pizza.jpeg" layout="fill" />
						</Box>
						<Spacer display={["none", "none", "block"]} />
						<Box
							w={["100%, 80%", "80%", "60%"]}
							h="auto"
							borderRadius="sm"
							style={{ backgroundColor: "rgba(18, 13, 12, 0.7)" }}
							color="white"
							py="5"
							px="8"
						>
							<Text
								fontStyle="italic"
								fontSize="3rem"
								fontFamily="Open Sans"
								fontWeight="700"
							>
								About Us
							</Text>
							{aboutUsTexts.map((text, index) => (
								<Box my="5" key={index}>
									<Text
										fontSize="1.5rem"
										mb="2"
										fontStyle="italic"
										fontFamily="Playfair Display"
										fontWeight="700"
									>
										<b> {text.title}</b>
									</Text>
									<Text
										color="#cccccc"
										fontSize="0.8rem"
										fontFamily="Open Sans"
										fontWeight="400"
									>
										{text.subtitle}
									</Text>
								</Box>
							))}
						</Box>
					</Flex>
					<Stack
						spacing="30px"
						align={["center", "center", "center", "initial"]}
						justify={["center", "center", "center", "space-between"]}
						direction={["column", "column", "column", "row"]}
					>
						<Box
							flexShrink={0}
							h="auto"
							w={["100%", "100%", "100%", "30%"]}
							borderRadius="20px"
							backgroundColor="white"
							px="10"
							py="5"
							id="deliveryInformation"
						>
							<Text
								fontSize="2xl"
								fontStyle="italic"
								color="#E23838"
								fontFamily="Playfair Display"
								fontWeight="700"
								textAlign="center"
							>
								Delivery Information
							</Text>
							<Box my="5">
								<b>Delivery Areas</b>

								<Flex>
									<Text fontSize="sm">POST CODE:&nbsp;</Text>
									<Text fontWeight="bold" fontSize="sm">
										{deliveryInformation.areas.postCode.join(", ")}
									</Text>
								</Flex>
							</Box>
							{deliveryInformation.costInfo.map((info, index) => (
								<Box my="5" key={index}>
									<Text fontSize="sm">
										<b> {info.cost}</b>&nbsp;-&nbsp;
										{info.areas.join(", ").toUpperCase()}
									</Text>
									<Text>{info.subtitle}</Text>
									<Text color="#E54D5A">{info.note}</Text>
								</Box>
							))}
							<Text color="red" fontSize="sm">
								We cannot accept EFTPOS at your door
							</Text>
						</Box>
						<Box
							h="auto"
							w={["100%", "100%", "100%", "30%"]}
							borderRadius="20px"
							backgroundColor="white"
							px="10"
							py="5"
						>
							<Text
								fontSize="2xl"
								fontStyle="italic"
								fontFamily="Playfair Display"
								fontWeight="700"
								color="#E23838"
								pb="5"
								textAlign="center"
							>
								Trading Hours
							</Text>
							{tradingHours.map((tradingHour, index) => (
								<Text fontSize="sm" pb="8px" key={index}>
									{tradingHour.day}:&nbsp;
									{tradingHour.time}
								</Text>
							))}
						</Box>
						<Box
							h={["300px", "300px", "300px", "auto"]}
							w={["100%", "100%", "100%", "30%"]}
							borderRadius="20px"
							backgroundColor="white"
							px="10"
							py="5"
							id="contactUs"
						>
							<Text
								fontSize="2xl"
								fontStyle="italic"
								fontFamily="Playfair Display"
								fontWeight="700"
								color="#E23838"
								pb="5"
								textAlign="center"
							>
								Contact Us
							</Text>
							<Text>Address: 9 Cambridge Road, Bellerive 7018</Text>
							<Text py="3">Telephone: 6244 7778</Text>
							<Text>Email: napoletanapizzahouse@gmail.com</Text>
						</Box>
					</Stack>
				</Box>
			</Flex>
			<Flex backgroundColor={"black"} justify="center">
				<Box w="1800px">
					<Box w="100%" px={["5px", "10px", "40px", "150px"]}>
						<MainFooter />
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Home;
