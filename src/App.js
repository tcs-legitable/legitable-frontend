import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { createContext, useState } from "react";

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState("");

  return (
    <ChakraProvider>
      <SignedInContext.Provider value={{ value, setValue }}>
        <VStack>
          <h1>hello</h1>
        </VStack>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

export default App;
