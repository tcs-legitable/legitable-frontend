/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import EndorseesPage from './components/EndorseesPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import theme from './theme/theme';
import GetStartedLandingPage from './components/landing-page-components/GetStartedLandingPage';
import Home from './components/organization-view-components/Home';
import StudentLanding from './components/student-view-components/StudentLanding';
import ProfilePage from './components/profile-components/ProfilePage';
import NewProject from './components/organization-view-components/NewProject';
import MyProjects from './components/organization-view-components/MyProjects';
import OrganizationGetStartedLandingPage from './components/landing-page-components/OrganizationGetStartedLandingPage';
import OrganizationProjectsPage from './components/organization-view-components/OrganizationProjectsPage';

import Messaging from './components/messaging/MessagingMain';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getOrganizationData, getUserData } from './firebase/helpers';

export const SignedInContext = createContext();

function App() {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const view = localStorage.getItem('view');
      if (user && view) {
        console.log(view, ' IS VIEW');
        const { uid, displayName } = user;
        let userData = null;
        if (view === 'organization') {
          console.log('organization sign in');
          userData = await getOrganizationData(uid);
        }
        if (view === 'student') {
          console.log('student sign in');
          userData = await getUserData(uid);
        }
        console.log(userData, ' comes first');
        const userInfo = {
          uid: uid,
          name: userData?.input_name || displayName,
          type: localStorage.getItem('view') || null,
          photo_url: userData?.photo_url || null,
        };
        console.log(userInfo, ' is userInfo');
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
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<GetStartedLandingPage />} />
              <Route
                path="/organization-signup"
                element={<OrganizationGetStartedLandingPage />}
              />
              <Route path="/endorsees/:userId" element={<EndorseesPage />} />
              <Route path="/home" element={!loading && <Home />} />
              <Route
                path="/projects"
                element={!loading && <StudentLanding view={value?.type} />}
              />
              <Route
                path={'/user/:userId'}
                element={!loading && <ProfilePage />}
              />
              <Route
                path={'/organization/:userId'}
                element={!loading && <OrganizationProjectsPage />}
              />
              <Route path="/new-project" element={<NewProject />} />
              <Route path="/my-projects" element={<MyProjects />} />
              <Route path="/messaging" element={<Messaging/>}/>
              {/* <Route path="/messaging/6oLvnxTUlcUsvajw2YhFzB5g8En1/F8lBp9S1alOfbA5Dtv7WMeX8sZl2" element={<Messaging />} /> */}
              <Route path="/messaging/:user1/:user2" element={<Messaging/>}/>
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
