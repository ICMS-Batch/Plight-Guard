import { Flex, Image, Text } from "@chakra-ui/react";

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
    >
      <Flex flexDirection="column" w="full" px={3}>
        <Text>{props.title} </Text>
      </Flex>
      <Flex w="auto" maxHeight="full" justifyContent="flex-end">
        <Image
          src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
          w="80px"
          height="auto"
        />
      </Flex>
    </Flex>
  );
};

export default Report;
