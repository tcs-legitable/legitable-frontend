import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useState } from "react";

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState("");

  return (
    <ChakraProvider>
      <SignedInContext.Provider value={{ value, setValue }}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

export default App;
