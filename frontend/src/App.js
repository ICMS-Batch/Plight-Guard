import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes";
import { AuthProvider } from "./auth/authProvider";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
