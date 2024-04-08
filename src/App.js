import "./App.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { createContext, useState } from "react";
import HomePage from "./components/HomePage";

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState("");

  return (
    <ChakraProvider>
      <SignedInContext.Provider value={{ value, setValue }}>
        <VStack>
          <HomePage />
        </VStack>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

export default App;
