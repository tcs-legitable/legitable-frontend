import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import AddSkillCard from './AddSkillCard';
import SkillCard from './SkillCard';

const ProfileSkills = ({ canEdit, skills, updateSkills }) => {
  const updateSkillInState = (updatedSkill) => {
    const updatedSkills = skills.map((skill) =>
      skill.skillName === updatedSkill.skillName ? updatedSkill : skill,
    );
    updateSkills(updatedSkills);
  };

  const addSkillInState = (newSkill) => {
    const updatedSkills = [...skills, newSkill];
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
      <Flex gap="10px" maxW="1700px" flexDir={{ base: 'column', mdLg: 'row' }}>
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
        {canEdit && skills.length < 3 && (
          <AddSkillCard addSkillInState={addSkillInState} />
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileSkills;
