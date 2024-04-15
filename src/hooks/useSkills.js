import { useEffect, useState } from 'react';
import axios from 'axios';

const useSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    //17000+ skills is too many lol lags
    // axios.get('/skills.txt')
    axios.get('/lessSkills.txt')
      .then(response => {
        const skillsArray = response.data.split('\n');
        setSkills(skillsArray);
      })
      .catch(error => console.error('Failed to load skills:', error));
  }, []);

  return skills;
};

export default useSkills;