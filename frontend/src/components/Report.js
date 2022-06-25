import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Report = (props) => {
  return (
    <Flex
      justifyContent="space-between"
      boxShadow="md"
      height="auto"
      width="full"
      borderRadius="md"
      backgroundColor="gray.100"
      alignItems="center"
      _hover={{
        bgColor: "blue.400",
        color: "white",
      }}
      cursor="pointer"
      as={Link}
      to="/preview"
    >
      <Flex flexDirection="column" w="full" px={3} gap="5px">
        <Text>{props.title} </Text>
        <Text>Published at {props.createdAt} </Text>
      </Flex>
      <Flex w="auto" maxHeight="full" justifyContent="flex-end">
        <Image src={props.image} w="80px" height="auto" />
      </Flex>
    </Flex>
  );
};

export default Report;
