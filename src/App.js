import "./App.css";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { createContext, useState } from "react";
import HomePage from "./components/HomePage";
import EndorseesPage from "./components/EndorseesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import GetStartedLandingPage from "./components/landing-page-components/GetStartedLandingPage";

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState("");

  return (
    <ChakraProvider theme={theme}>
      <SignedInContext.Provider value={{ value, setValue }}>
        <VStack height="100%" class="outer-container">
          {/* <HomePage /> */}
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<GetStartedLandingPage />} />
              <Route path="/endorsees/:userId" element={<EndorseesPage />} />
            </Routes>
          </Router>
        </VStack>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

export default App;
