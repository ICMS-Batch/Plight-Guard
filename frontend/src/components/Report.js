import { Flex, Box, chakra, Link, Image, Text } from "@chakra-ui/react";

const Report = () => {
  return (
    <Flex
      justifyContent="space-between"
      boxShadow="md"
      height="auto"
      width="full"
      borderRadius="md"
      backgroundColor="gray.200"
    >
      <Flex w="40%">
        <Image
          src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80"
          h="full"
          w="250px"
        />
      </Flex>
      <Flex flexDirection="column" w="60%">
        <Text fontSize="2xl">
          Hello there is a problem with road here, and we have to fix this
        </Text>
        <Text>
          Hello there is a problem with road here, and we have to fix this Hello
          there is a problem with road here, and we have to fix this Hello there
          is a problem with road here, and we have to fix this Hello there is a
          problem with road here, and we have to fix this Hello there is a
          problem with road here, and we have to fix this Hello there is a
          problem with road here, and we have to fix this Hello there is a
          problem with road here, and we have to fix this
        </Text>
      </Flex>
    </Flex>
  );
};

export default Report;
