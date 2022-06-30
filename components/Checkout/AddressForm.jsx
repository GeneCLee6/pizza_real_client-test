import {
	FormControl,
	FormLabel,
	Text,
	Input,
	Flex,
	Box,
	Link,
	Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddressForm = (props) => {
	const { isOnCheckout, shoppingOption } = props;

	const formInputs = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		comment: '',
		address: '',
		addressData: {},
		payment: '',
		suburb: '',
	};

	const [inputs, setInputs] = useState(formInputs);
	const [isErrorFirstName, setIsErrorFirstName] = useState(false);
	const [isErrorLastName, setIsErrorLastName] = useState(false);
	const [isErrorPhone, setIsErrorPhone] = useState(false);
	const [isErrorEmail, setIsErrorEmail] = useState(false);
	const [isErrorAddress, setIsErrorAddress] = useState(false);
	const [isErrorSuburb, setIsErrorSuburb] = useState(false);
	const [isRenderAddressDropDown, setIsRenderAddressDropDown] = useState(false);
	const [addressesFound, setAddressesFound] = useState([]);

	const isRequireAddress = shoppingOption === 'delivery';

	useEffect(() => {
		const validateForm = (form) => {
			const [firstName, lastName, phone, email] = Object.values(form);
			let errorCount = 0;
			const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
			const phoneRule = /^[0-9]*$/;

			if (firstName.trim() === '') {
				setIsErrorFirstName(true);
				errorCount++;
			} else setIsErrorFirstName(false);

			if (lastName.trim() === '') {
				setIsErrorLastName(true);
				errorCount++;
			} else setIsErrorLastName(false);

			if (phone.trim() === '' || phone.search(phoneRule) == -1) {
				setIsErrorPhone(true);
				errorCount++;
			} else setIsErrorPhone(false);

			if (email.trim() === '' || email.search(emailRule) == -1) {
				setIsErrorEmail(true);
				errorCount++;
			} else setIsErrorEmail(false);

			if (form.suburb.trim() === '' && isRequireAddress) {
				setIsErrorSuburb(true);
				errorCount++;
			} else setIsErrorSuburb(false);

			if (inputs.address.trim() === '' && isRequireAddress) {
				setIsErrorAddress(true);
				errorCount++;
			} else setIsErrorAddress(false);

			return errorCount;
		};
		props.errorsCount(validateForm(inputs));
		props.onChange(inputs);
		//	console.log(inputs);
	}, [inputs, isOnCheckout, isRequireAddress, props, shoppingOption]);

	const onSelectAddress = (selectedAddress) => {
		const addressData = Object.assign({}, selectedAddress);
		const formattedAddress = addressData.formatted;
		handleInputsChange('address', formattedAddress);
		handleInputsChange('addressData', addressData);
		setIsRenderAddressDropDown(false);
	};

	const runAutoCompleteAddress = async (address) => {
		const apiKey = process.env.GEOAPIFY_API_KEY;
		const text = address;
		const filter = 'countrycode:au';
		const lang = 'en';
		const format = 'json';
		const baseApiUrl = 'https://api.geoapify.com/v1/geocode/autocomplete';
		const api = `${baseApiUrl}?text=${text}&filter=${filter}&lang=${lang}&format=${format}&apiKey=${apiKey}`;
		const res = await axios.get(api);
		const addresses = res.data.results;
		setAddressesFound(addresses);
	};

	const handleInputsChange = (inputName, inputValue) => {
		if (inputName === 'address' && inputValue !== inputs.address) {
			if (inputValue.trim().length > 4) {
				setIsRenderAddressDropDown(true);
				runAutoCompleteAddress(inputValue);
			} else {
				setInputs((inputs) => ({ ...inputs, addressData: {} }));
				setIsRenderAddressDropDown(false);
			}
		}

		setInputs((inputs) => ({ ...inputs, [inputName]: inputValue }));
	};

	return (
		<>
			<Box>
				<FormControl isRequired>
					<Flex direction="column">
						<Flex my="2">
							<Box maxW="100%">
								<FormLabel htmlFor="name" fontWeight="400" fontSize="1.3rem">
									Name
								</FormLabel>
							</Box>
							<Input
								mr="3"
								type="text"
								value={inputs.firstName}
								borderColor={isErrorFirstName ? 'red' : 'grey'}
								placeholder="First Name"
								onChange={(e) =>
									handleInputsChange('firstName', e.target.value)
								}
							/>
							<Input
								type="text"
								value={inputs.lastName}
								borderColor={isErrorLastName ? 'red' : 'grey'}
								placeholder="Last Name"
								onChange={(e) => handleInputsChange('lastName', e.target.value)}
							/>
						</Flex>
						<Flex my="2">
							<Box w="150px">
								<FormLabel htmlFor="phone" fontWeight="400" fontSize="1.3rem">
									Phone
								</FormLabel>
							</Box>
							<Input
								type="text"
								value={inputs.phone}
								borderColor={isErrorPhone ? 'red' : 'grey'}
								placeholder="04 4567 8888"
								onChange={(e) => handleInputsChange('phone', e.target.value)}
							/>
						</Flex>
						<Flex my="2">
							<Box w="150px">
								<FormLabel htmlFor="email" fontWeight="400" fontSize="1.3rem">
									Email
								</FormLabel>
							</Box>
							<Input
								type="email"
								value={inputs.email}
								borderColor={isErrorEmail ? 'red' : 'grey'}
								placeholder="example@gmail.com"
								onChange={(e) => handleInputsChange('email', e.target.value)}
							/>
						</Flex>
					</Flex>
				</FormControl>
				<FormControl>
					<Flex my="2">
						<Box w="150px">
							<FormLabel htmlFor="comment" fontWeight="400" fontSize="1.3rem">
								Comment
							</FormLabel>
						</Box>
						<Input
							type="text"
							value={inputs.comment}
							borderColor="grey"
							placeholder="please write down your comment"
							onChange={(e) => handleInputsChange('comment', e.target.value)}
						/>
					</Flex>
				</FormControl>
				{isRequireAddress && (
					<FormControl isRequired={isRequireAddress}>
						<Flex my="2">
							<Box w="150px">
								<FormLabel htmlFor="suburb" fontWeight="400" fontSize="1.3rem">
									Suburb
								</FormLabel>
							</Box>
							<Select
								placeholder="Select Suburb"
								value={inputs.suburb}
								borderColor={isErrorSuburb ? 'red' : 'grey'}
								onChange={(e) => handleInputsChange('suburb', e.target.value)}
							>
								<option value="Bellerive">Bellerive</option>
								<option value="Rosny">Rosny</option>
								<option value="Rosny Park">Rosny Park</option>
								<option value="Montagu Bay">Montagu Bay</option>
								<option value="Warrane">Warrane</option>
								<option value="Rose Bay">Rose Bay</option>
								<option value="Mornington">Mornington</option>
								<option value="Lindisfarne">Lindisfarne</option>
								<option value="Howrah">Howrah</option>
								<option value="Rokeby">Rokeby</option>
								<option value="Tranmere">Tranmere</option>
								<option value="Clarendon Vale">Clarendon Vale</option>
								<option value="Oakdowns">Oakdowns</option>
								<option value="Geilston Bay">Geilston Bay</option>
							</Select>
						</Flex>
						<Flex my="2">
							<Box w="150px">
								<FormLabel htmlFor="address" fontSize="1.3rem" fontWeight="400">
									Address
								</FormLabel>
							</Box>
							<Flex
								direction="column"
								position="relative"
								display="inline-block"
								w="100%"
							>
								<Input
									type="text"
									value={inputs.address}
									borderColor={isErrorAddress ? 'red' : 'grey'}
									placeholder="Address"
									onChange={(e) =>
										handleInputsChange('address', e.target.value)
									}
								/>

								{/* {isRenderAddressDropDown && (
									<Box
										border="1px solid grey"
										borderRadius="5px"
										backgroundColor="white"
										w="100%"
										pl="3"
										position="absolute"
										zIndex="1"
									>
										{addressesFound.map((address, index) => (
											<Text
												key={index}
												onClick={() => onSelectAddress(address)}
												cursor="pointer"
											>
												{address.formatted}
											</Text>
										))}
										<Text align="end" mb="2" mt="5" mr="2" fontSize="xs">
											Powered by{" "}
											<Link
												href="https://www.geoapify.com/"
												isExternal
												color="blue"
											>
												Geoapify
											</Link>
										</Text>
									</Box>
								)} */}
								<Text align="center" color="grey">
									We only deliver to post code 7015, 7018, 7019
								</Text>
							</Flex>
						</Flex>
					</FormControl>
				)}
			</Box>
		</>
	);
};

export default AddressForm;
