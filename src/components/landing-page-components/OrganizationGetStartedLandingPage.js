import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import LandingCreateOrganizationProfile from './LandingCreateOrganizationProfile';
import LandingLayout from './LandingLayout';
import OrganizationLandingFinal from './OrganizationLandingFinal';
import OrganizationLandingSignIn from './OrganizationLandingSignIn';

const OrganizationGetStartedLandingPage = () => {
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

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
        {step === 0 && (
          <OrganizationLandingSignIn
            data={data}
            setData={setData}
            goNext={goNext}
          />
        )}
        {step === 1 && (
          <LandingCreateOrganizationProfile
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {step === 2 && (
          <OrganizationLandingFinal
            data={data}
            setData={setData}
            goNext={goNext}
          />
        )}
      </LandingLayout>
    </Flex>
  );
};

export default OrganizationGetStartedLandingPage;
