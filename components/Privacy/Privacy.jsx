import { Flex, Box, Text } from '@chakra-ui/react';
import Header from '../Header';
import MainFooter from '../MainFooter';
const Privacy = () => {
	return (
		<Box
			border="0.1px solid transparent"
			backgroundImage="url('/image/background.jpg')"
			backgroundPosition="center"
			backgroundSize="cover"
		>
			<Flex backgroundColor={'black'} justify="center">
				<Box w="1800px">
					<Box w="100%" px={['5px', '10px', '40px', '150px']}>
						<Header />
					</Box>
				</Box>
			</Flex>
			<Box p={20}>
				<Text
					fontSize="30px"
					lineHeight="normal"
					fontWeight="semibold"
					color="white"
					as="i"
				>
					Privacy Policy
				</Text>
				<Text color="white" m={2} fontSize="14px">
					1. We respect your privacy
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Napoletana Pizza House respects your right to privacy and this policy
					sets out how we collect
				</Text>
				<Text color="white" m={2} fontSize="14px">
					and treat your personal information.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					“Personal information” is information we hold which is identifiable as
					being about you.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					2.What personal information we collect
				</Text>
				<Text color="white" m={2} fontSize="14px">
					We may collect the following types of personal information from you:
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Name
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Address
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Phone number
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Fax number
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Information about the goods and services you have ordered
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Information from enquirers you have made
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Communications between us
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Credit card information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					3.How we collect your personal information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					We collect personal information from you in a variety of ways,
					including: when you interact with
				</Text>
				<Text color="white" m={2} fontSize="14px">
					us electronically or in person; when you access our website; and when
					we provide our services to
				</Text>
				<Text color="white" m={2} fontSize="14px">
					you.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					4.Use of your personal information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					We use your information to provide our service to you. We also use it
					to improve our service and
				</Text>
				<Text color="white" m={2} fontSize="14px">
					to notify you of opportunities that we think you might be interested
					in.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					We do not provide your information to third parties, expect that we
					may provide your information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					to our business partners who assist us in the provision of our
					services to you.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					5.Credit card privacy policy by internet order
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Internet orders can be paid by cash in store, debit cards, gift
					voucher or e-voucher, or pre-paid via
				</Text>
				<Text color="white" m={2} fontSize="14px">
					a valid Credit Card which must be presented upon receipt of your
					order. Your Credit card details
				</Text>
				<Text color="white" m={2} fontSize="14px">
					are required to process payment on the internet order system however
					they are not saved once the
				</Text>
				<Text color="white" m={2} fontSize="14px">
					order is processed.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					Paypal payment follows Paypal company privacy policy and terms &
					conditions
				</Text>
				<Text color="white" m={2} fontSize="14px">
					6.Security of your personal information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					We take reasonable steps to protect your personal information. However
					we are not liable for any
				</Text>
				<Text color="white" m={2} fontSize="14px">
					unauthorised access to this information.
				</Text>
				<Text color="white" m={2} fontSize="14px">
					7. Access to your personal information
				</Text>
				<Text color="white" m={2} fontSize="14px">
					You can access and update your personal information by contacting us
					on 6244 7778 or
				</Text>
				<Text color="white" m={2} fontSize="14px">
					napoletanapizzahouse@gmail.com
				</Text>
			</Box>
			<MainFooter />
		</Box>
	);
};

export default Privacy;
