import { Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex bgColor="blackAlpha.800" py="4" alignItems="center">
      <Link to="/" as={RouterLink} color="white" pl="5">
        Plight Guard
      </Link>
      <Flex
        maxWidth="container.xl"
        justifyContent="flex-end"
        w="full"
        gap="15px"
        color="white"
        alignItems="center"
      >
        <Button colorScheme="blue" as={RouterLink} to="/post-report">
          Post a report
        </Button>
        <Link to="/login" as={RouterLink}>
          Login
        </Link>
        <Link to="/register" as={RouterLink}>
          Sign Up
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
