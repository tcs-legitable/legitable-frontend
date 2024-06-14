import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { SignedInContext } from '../../App';
import SkillCard from './SkillCard';

const ProfileSkills = ({ canEdit, skills, updateSkills }) => {
  const { setValue } = useContext(SignedInContext);

  const updateSkillInState = (updatedSkill) => {
    const updatedSkills = skills.map((skill) =>
      skill.skillName === updatedSkill.skillName ? updatedSkill : skill,
    );
    updateSkills(updatedSkills);
  };

  const removeSkillFromState = (skillName) => {
    const updatedSkills = skills.filter(
      (skill) => skill.skillName !== skillName,
    );
    updateSkills(updatedSkills);
  };

  return (
    <Flex mt="40px" flexDir="column">
      <Text pb="20px" fontSize="23px" fontWeight="bold">
        Skills & relevant work
      </Text>
      <Flex gap="10px" flexDir={{ base: 'column', mdLg: 'row' }}>
        {skills &&
          skills.map((skill, id) => {
            return (
              <SkillCard
                skill={skill}
                key={id}
                canEdit={canEdit}
                updateSkillInState={updateSkillInState}
                removeSkillFromState={removeSkillFromState}
              />
            );
          })}
      </Flex>
    </Flex>
  );
};

export default ProfileSkills;
