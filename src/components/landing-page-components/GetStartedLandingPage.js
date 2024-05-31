import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LandingCreateStudentProfile from "./LandingCreateStudentProfile";
import LandingFinal from "./LandingFinal";
import LandingGetStarted from "./LandingGetStarted";
import LandingLayout from "./LandingLayout";
import LandingPage from "./LandingPage";
import LandingSelectSkills from "./LandingSelectSkills";
import LandingSignIn from "./LandingSignIn";

const GetStartedLandingPage = () => {
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
        {step === 0 && <LandingPage goNext={goNext} />}
        {/* sign in w/ gmail page */}
        {step === 1 && (
          <LandingGetStarted
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {/* create student profile page */}
        {step === 2 && (
          <LandingSignIn
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {/* skills page */}
        {step === 3 && (
          <LandingCreateStudentProfile
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {/* ending page */}
        {step === 4 && (
          <LandingSelectSkills
            data={data}
            setData={setData}
            goNext={goNext}
            goPrev={goPrev}
          />
        )}
        {step === 5 && (
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
