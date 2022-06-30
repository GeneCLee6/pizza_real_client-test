import { Flex, Box, Spacer, Link } from '@chakra-ui/react';
import { FaInstagram } from 'react-icons/fa';
import { RiFacebookCircleFill, RiWechat2Line } from 'react-icons/ri';
import ChakraNextImage from '../UI/ChakraNextImage';

const MainFooter = () => {
	return (
		<>
			<Flex
				display={['flex', 'flex']}
				h={{ base: '680px', md: '185px' }}
				// alignItems="center"
				alignItems={{ base: 'left', md: 'center' }}
				backgroundColor="black"
				direction={{ base: 'column', md: 'row' }}
			>
				<Box
					width="192px"
					height="64px"
					pos="relative"
					mt={{ base: '10px', md: '0' }}
				>
					<ChakraNextImage
						src="/image/logo.png"
						alt="logo"
						layout="fill"
						objectFit="contain"
					/>
				</Box>
				<Flex
					display={['flex', 'flex']}
					color="#646464"
					fontFamily="Playfair Display"
					m={4}
					direction="column"
					alignSelf="flex-start"
				>
					<Box as="i" fontWeight="700">
						INFORMATION
					</Box>
					<Link href="/#about">About Us</Link>
					<Link href="/#deliveryInformation">Delivery Information</Link>
					<Link href="/privacy">Privacy Policy</Link>
					<Link href="/term">Terms & Conditions</Link>
				</Flex>

				<Flex
					display={['flex', 'flex']}
					color="#646464"
					fontFamily="Playfair Display"
					m={4}
					direction="column"
					alignSelf="flex-start"
				>
					<Box as="i" fontWeight="700">
						CUSTOMER SERVICE
					</Box>
					<Link href="/menu">Our Menu</Link>
					<Link href="/menu">Specials</Link>
					<Link href="#contactUs">Contact Us</Link>
				</Flex>
				<Spacer display={['none', 'flex']}></Spacer>
				{/* <Flex
					display={["flex", "flex"]}
					color="white"
					fontFamily="Playfair Display"
					m={4}
					direction="column"
					alignSelf="flex-start"
				>
					<Box as="i" fontWeight="700" mr={8}>
						FOLLOW US
					</Box>
					<Flex>
						<Link href="#" m={1}>
							<RiFacebookCircleFill />
						</Link>
						<Link href="#" m={1}>
							<FaInstagram />
						</Link>
						<Link href="#" m={1}>
							<RiWechat2Line />
						</Link>
					</Flex>
				</Flex> */}
			</Flex>
		</>
	);
};

export default MainFooter;
