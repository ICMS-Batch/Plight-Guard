import "./App.css";
import Map from "./components/Map";
import { ChakraProvider, Flex, chakra } from "@chakra-ui/react";
import Report from "./components/Report";
import Routes from "./routes";

function App() {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
