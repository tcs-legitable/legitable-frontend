/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import theme from './theme/theme';
import MessagingMain from './components/messaging/MessagingMain';
import GetStartedLandingPage from './components/landing-page-components/GetStartedLandingPage';
import OrganizationGetStartedLandingPage from './components/landing-page-components/OrganizationGetStartedLandingPage';
import Home from './components/organization-view-components/Home';
import StudentLanding from './components/student-view-components/StudentLanding';
import ProfilePage from './components/profile-components/ProfilePage';
import NewProject from './components/organization-view-components/NewProject';
import MyProjects from './components/organization-view-components/MyProjects';
import OrganizationProjectsPage from './components/organization-view-components/OrganizationProjectsPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrganizationData, getUserData } from './firebase/helpers';
import Messaging from './components/messaging/Messaging';

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const view = localStorage.getItem('view');
      if (user && view) {
        const { uid, displayName } = user;
        let userData = null;
        if (view === 'organization') {
          userData = await getOrganizationData(uid);
        }
        if (view === 'student') {
          userData = await getUserData(uid);
        }
        const userInfo = {
          uid: uid,
          name: userData?.input_name || displayName,
          type: localStorage.getItem('view') || null,
          photo_url: userData?.photo_url || null,
        };
        setValue(userInfo);
      } else {
        setValue({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <SignedInContext.Provider value={{ value, setValue }}>
        <VStack height="100%" className="outer-container">
          <Router>
            <BackgroundColorChanger />
            <Routes>
              <Route
                path="/student-signup"
                element={<GetStartedLandingPage />}
              />
              <Route
                path="/organization-signup"
                element={<OrganizationGetStartedLandingPage />}
              />
              <Route path="/home" element={!loading && <Home />} />
              {/* <Route
                path="/projects"
                element={!loading && <StudentLanding view={value?.type} />}
              /> */}
              <Route
                path="/user/:userId"
                element={!loading && <ProfilePage />}
              />
              <Route
                path="/organization/:userId"
                element={!loading && <OrganizationProjectsPage />}
              />
              <Route path="/new-project" element={<NewProject />} />
              <Route path="/my-projects" element={<MyProjects />} />
              <Route path="/messaging" element={<MessagingMain />} />
              <Route path="/messaging/:user1/:user2" element={<Messaging />} />

              <Route
                path="/landing"
                element={<Navigate to="/home" replace />}
              />
              <Route
                path="/projects"
                element={<Navigate to="/home" replace />}
              />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
          </Router>
        </VStack>
      </SignedInContext.Provider>
    </ChakraProvider>
  );
}

const BackgroundColorChanger = () => {
  const location = useLocation();

  useEffect(() => {
    const changeBackgroundColor = () => {
      if (location.pathname === '/') {
        document.body.style.backgroundColor = '#0c0c0c';
      } else {
        document.body.style.backgroundColor = '#fafafa';
      }
    };

    changeBackgroundColor();
  }, [location]);

  return null;
};

export default App;
