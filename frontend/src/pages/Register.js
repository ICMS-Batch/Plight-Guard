import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Select,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import UserService from "../services/UserService";
import ReportService from "../services/ReportService";
import { useAuth } from "../auth/authProvider";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    full_name: "",
    municipality: 0,
  });
  const [municipalities, setMunicipalities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...credentials,
      username: credentials.email,
      first_name: credentials.full_name.split(" ")[0],
      last_name: credentials.full_name.split(" ")[1],
    };
    UserService.register(formData).then((response) => {
      console.log("response found", response);
    });
  };

  useEffect(() => {
    ReportService.getMunicipalities().then((response) => {
      setMunicipalities(response.results);
    });
  }, []);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Sign Up</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="full name"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        full_name: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        email: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="email" mt={1}>
                <Select
                  placeholder="Select Municipality"
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      municipality: e.target.value,
                    });
                  }}
                  value={credentials.municipality}
                >
                  {municipalities.map((municipality, index) => {
                    return (
                      <option key={index} value={municipality.id}>
                        {municipality.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account ?{" "}
        <Link color="blue.500" as={RouterLink} to="/login">
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
