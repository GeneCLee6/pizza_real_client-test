import { Button, Text, Stack, Link, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
const PaymentSuccess = ({ orderNumber, shoppingOption, prepareTime }) => {
	return (
		<>
			<Stack direction="column" align="center" justify="center" mt="10" pl="1">
				<Flex align="center">
					<Text fontSize="2rem">Payment Success</Text>
					<CheckCircleIcon color="green" w={10} h={10} />
				</Flex>

				<Text fontSize="xl">
					Your order will be ready in {prepareTime[0]} - {prepareTime[1]}{' '}
					minutes for {shoppingOption}
				</Text>
				{orderNumber && <Text fontSize="xl">Order Number: {orderNumber}</Text>}
				<NextLink href="/menu" passHref>
					<Link>
						<Button
							rightIcon={<ArrowForwardIcon />}
							colorScheme="teal"
							variant="outline"
						>
							Continue shopping?
						</Button>
					</Link>
				</NextLink>
			</Stack>
		</>
	);
};

export default PaymentSuccess;
