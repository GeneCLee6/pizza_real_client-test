import { Flex, Box, Text } from "@chakra-ui/react";
const Contact = () => {
	return (
    <>
      <Flex align="center">
        <Text color="grey" m={1}>
          TEL.
        </Text>
        <Text
          m={1}

          color="red"
          fontSize={{ base: "md", md: "2xl" }}
          //fontWeight="700"
        >
          6244 7778
        </Text>
      </Flex>
      <Flex align="center">
        <Box color="grey" m={1}>
          Address.
        </Box>
        <Box color="white" m={1}>
          9 Cambridge Road, Bellerive 7018
        </Box>
      </Flex>
    </>
  );
};

export default Contact;
