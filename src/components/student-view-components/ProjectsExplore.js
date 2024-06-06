import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const ProjectsExplore = () => {
  const isDesktop = useBreakpointValue({ base: false, mdLg: true });

  const projects = [
    {
      name: 'CFC podcast branding',
      location: 'Vancouver',
      deadline: 'July 1, 2024',
      budget: '$500',
      project_pref: 'Remote',
      tags: ['Branding', 'Social Media Content'],
      description:
        "Branding and social media post templates for our new podcast called 'Sink or Swim'",
      photo_url:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Garfield_the_Cat.jpg/220px-Garfield_the_Cat.jpg',
      lead_name: {
        name: 'Garfield Lasagna',
        link: 'https://www.byronwang.com/',
      },
      links: [
        { display_name: 'Airbnb', link: 'https://www.byronwang.com/' },
        { display_name: 'Website example', link: 'https://www.byronwang.com/' },
        {
          display_name: 'Something cool style',
          link: 'https://www.byronwang.com/',
        },
      ],
      organization_name: 'Mondays Association',
    },
    {
      name: 'TCS branding',
      location: 'Vancouver',
      deadline: 'July 1, 2024',
      budget: '$500',
      project_pref: 'In-person',
      tags: ['Branding', 'Web Design'],
      description: 'Doing the branding for the creative solution ayo',
      photo_url:
        'https://media.licdn.com/dms/image/D4E03AQHRHHKsGXsN2Q/profile-displayphoto-shrink_200_200/0/1708636073967?e=2147483647&v=beta&t=4_kJRYqMsVcpeDOo-Gbp7yucbwIbKi4h2SxJXxsRSK4',
      lead_name: {
        name: 'Aayush Kogar',
        link: 'https://www.byronwang.com/',
      },
      links: [
        { display_name: 'Airbnb', link: 'https://www.byronwang.com/' },
        { display_name: 'Website example', link: 'https://www.byronwang.com/' },
      ],
      organization_name: 'Mondays Association',
    },
  ];

  return (
    <Flex bgColor="#fafafa" py="40px" px="50px" h="100%" flexDir="column">
      <Text fontWeight="bold" fontSize="30px">
        Top projects for you this week
      </Text>
      <Box mt="40px" bgColor="#e7e7e7" h="2px" w="100%"></Box>
      <Flex flexDir={isDesktop ? 'row' : 'column'}></Flex>
    </Flex>
  );
};

export default ProjectsExplore;
