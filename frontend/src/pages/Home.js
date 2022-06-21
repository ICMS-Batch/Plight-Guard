import { Flex, chakra } from "@chakra-ui/react";
import Map from "../components/Map";
import Report from "../components/Report";

const Home = () => {
  return (
    <Flex
      maxW="full"
      maxH="full"
      h="full"
      width="full"
      justifyContent="space-between"
    >
      <chakra.div
        w="50%"
        px="5"
        py="3"
        display="flex"
        flexDir="column"
        gap="10px"
        maxHeight="calc(100vh - 60px)"
        overflowY="scroll"
      >
        {new Array(5).fill("").map((_, key) => {
          return <Report key={key} />;
        })}
      </chakra.div>

      <Map />
    </Flex>
  );
};

export default Home;
