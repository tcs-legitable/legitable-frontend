/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import EndorseesPage from './components/EndorseesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import GetStartedLandingPage from './components/landing-page-components/GetStartedLandingPage';
import Home from './components/organization-view-components/Home';
import StudentLanding from './components/student-view-components/StudentLanding';

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState({});

  useEffect(() => {
    const storedValue = localStorage.getItem('user-data');
    setValue(JSON.parse(storedValue));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <SignedInContext.Provider value={{ value, setValue }}>
        <VStack height="100%" className="outer-container">
          {/* <HomePage /> */}
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<GetStartedLandingPage />} />
              <Route path="/endorsees/:userId" element={<EndorseesPage />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/projects"
                element={<StudentLanding view={value?.type} />}
              />
            </Routes>
          </Router>
        </VStack>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

export default App;
