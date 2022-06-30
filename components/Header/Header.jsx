import {
	Flex,
	Box,
	Text,
	Spacer,
	Button,
	Link,
	IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ChakraNextImage from "../UI/ChakraNextImage";
import NextLink from "next/link";
import Contact from "./Contact";

const Header = () => {
	const [display, setDisplay] = useState("none");
	return (
		<>
			<Flex
				h={{ base: "68px", sm: "108px" }}
				alignItems="center"
				backgroundColor="black"
			>
				<NextLink href="/" passHref>
					<Link
						width={{ base: "168px", md: "192px" }}
						height={{ base: "48px", md: "64px" }}
						pos="relative"
					>
						<ChakraNextImage
							src="/image/logo.png"
							alt="logo"
							layout="fill"
							objectFit="contain"
						/>
					</Link>
				</NextLink>

				<NextLink href="/menu" passHref>
					<Link
						display={["none", "flex"]}
						as="i"
						href="#"
						color="white"
						fontSize={{ base: "md", md: "2xl" }}
						fontWeight="700"
						m={4}
					>
						Our Menu
					</Link>
				</NextLink>
				<Spacer />
				<Flex display={{ base: "none", md: "flex" }} direction="column">
					<Contact />
				</Flex>
				<Link
					display={["none", "flex"]}
					as="i"
					m={4}
					href="/menu"
					color="white"
					fontSize={{ base: "md", md: "2xl" }}
					fontWeight="700"
				>
					Online Order
				</Link>
				<IconButton
					aria-label="Open Menu"
					size="lg"
					mr={2}
					icon={<HamburgerIcon />}
					display={["flex", "none"]}
					onClick={() => setDisplay("flex")}
					backgroundColor="black"
					color="white"
				></IconButton>
			</Flex>
			<Flex
				w="100vw"
				bgColor="gray.50"
				zIndex={20}
				h="100vh"
				pos="fixed"
				top="0"
				left="0"
				overflowY="auto"
				flexDir="column"
				display={display}
			>
				<Flex justify="flex-end">
					<IconButton
						mt={2}
						mr={2}
						aria-label="Close Menu"
						size="lg"
						icon={<CloseIcon />}
						onClick={() => setDisplay("none")}
					></IconButton>
				</Flex>
				<Flex flexDir="column" align="center">
					<NextLink href="/" passHref>
						<Button
							as="a"
							variant="ghost"
							aria-label="Our Menu"
							my={5}
							w="100%"
							onClick={() => setDisplay("none")}
						>
							Home
						</Button>
					</NextLink>
					<NextLink href="/menu" passHref>
						<Button
							as="a"
							variant="ghost"
							aria-label="Our Menu"
							my={5}
							w="100%"
							onClick={() => setDisplay("none")}
						>
							Our Menu
						</Button>
					</NextLink>
					<NextLink href="/menu" passHref>
						<Button
							as="a"
							variant="ghost"
							aria-label="Our Menu"
							my={5}
							w="100%"
							onClick={() => setDisplay("none")}
						>
							Online Order
						</Button>
					</NextLink>
				</Flex>
			</Flex>
		</>
	);
};

export default Header;
