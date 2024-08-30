import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import LandingCreateStudentProfile from './LandingCreateStudentProfile';
import LandingFinal from './LandingFinal';
import LandingLayout from './LandingLayout';
import LandingPage from './LandingPage';
import LandingSelectSkills from './LandingSelectSkills';
import LandingSignIn from './LandingSignIn';

const GetStartedLandingPage = () => {
  const location = useLocation();
  const { step: assignedStep = 1 } = queryString.parse(location.search);
  const [data, setData] = useState({});
  const [step, setStep] = useState(Number(assignedStep));

  const goNext = () => {
    setStep(step + 1);
  };

  const goPrev = () => {
    setStep(step - 1);
  };

  return (
    <Flex
      className="landing"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <LandingLayout goPrev={goPrev} step={step}>
        {step === 0 && <LandingPage goNext={goNext} />}
        {step === 1 && (
          <LandingSignIn
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {step === 2 && (
          <LandingCreateStudentProfile
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {step === 3 && (
          <LandingSelectSkills
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {step === 4 && (
          <LandingFinal
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
      </LandingLayout>
    </Flex>
  );
};

export default GetStartedLandingPage;
