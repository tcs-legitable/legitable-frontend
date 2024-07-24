import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsExplore = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const projects = [
    {
      id: '1',
      name: 'Branding for a Deep-Dive Gaming YouTuber',
      location: 'Toronto',
      deadline: 'August 25, 2024',
      budget: '$350',
      project_pref: 'Remote',
      tags: ['Branding', 'Graphic Design'],
      description:
        "Hi, I'm Cam, I run UncleMumble as a lifelong gamer with a mission of diving deep into games so other gamers can just enjoy their play. I'm looking for cohesive branding deliverables, including official brand colors with a core orange theme, YouTube and Twitch banners, and a logo featuring an illustrated Uncle Mumble mascot. The branding should be intentionally scrappy and authentic, yet crisp. Additionally, I need templates for 2-4 thumbnails that leverage the new branding and my past experiences in optimizing thumbnails. Apply if interested. Would love to work alongside designers who have a passion for gaming.",
      photo_url:
        'https://yt3.googleusercontent.com/JVTZl-jaxRf8Oydw8BrKayrX0w2HydCpIKkewcNW_gxM4B1lju14AZYF6Ji4LIZxqS63aJrB=s160-c-k-c0x00ffffff-no-rj',
      lead_name: {
        name: 'Cam',
        link: 'https://www.youtube.com/@unclemumble',
      },
      links: [
        {
          display_name: 'UncleMumble YouTube Channel',
          link: 'https://www.youtube.com/@unclemumble',
        },
        {
          display_name: 'TagBackTv YouTube Channel',
          link: 'https://www.youtube.com/@TagBackTv/videos',
        },
      ],
      organization_name: 'Uncle Mumble',
    },
    {
      id: '2',
      name: 'Savory Oats Brand + Packaging Design',
      location: 'Vancouver',
      deadline: 'August 15, 2024',
      budget: '$400',
      project_pref: 'Hybrid',
      tags: ['Branding', 'Packaging Design'],
      description:
        'Targeting young health-conscious late-night snackers, we are looking for basic branding and packaging design for a Savery Oats product that will soon hit the counters. This will be about a one-month long project which you will work directly with the founder on.',
      photo_url:
        'https://media.licdn.com/dms/image/D5603AQEXxucq4fChQA/profile-displayphoto-shrink_400_400/0/1700476565330?e=1727308800&v=beta&t=DDd1JMoWje85EMY7ImxKiquY4bSatCdMyB8FQrINAL4',
      lead_name: {
        name: 'James Kim',
        link: 'https://www.linkedin.com/in/jameskimca/',
      },
      links: [
        {
          display_name: 'Google Drive Inspiration',
          link: 'https://drive.google.com/file/d/1oCo9tiI1fqTQbL_sQNnLs-sqeEPBWt9M/view?usp=sharing',
        },
      ],
      organization_name: 'Floats',
    },
    {
      id: '3',
      name: 'WHEREAMI Music Video Shoot',
      location: 'Vancouver',
      deadline: 'August 9, 2024',
      budget: '$200',
      project_pref: 'In-person',
      tags: ['Videography'],
      description:
        'Ideate, plan, and produce a music video with me! I want a creative partner to bounce ideas off of, plan shots, operate the camera, and give feedback on the edit. I will handle for the most part - sourcing talent, direction, post-production.',
      photo_url: null,
      lead_name: {
        name: 'Justin Kung',
        link: 'https://www.linkedin.com/in/justinzoekung/',
      },
      links: [
        {
          display_name: 'Inspo video 1',
          link: 'https://www.youtube.com/watch?v=zVIPD_PUBbo',
        },
        {
          display_name: 'Inspo video 2',
          link: 'https://www.youtube.com/watch?v=5GhhVHpPR_M',
        },
        {
          display_name: 'Inspo video 3',
          link: 'https://www.youtube.com/watch?v=dyoV1IwGobU',
        },
        {
          display_name: 'Inspo video 4',
          link: 'https://www.youtube.com/watch?v=ScDgJJi5Guc',
        },
      ],
      organization_name: 'Justin Kung',
    },
  ];

  return (
    <Flex bgColor="#fafafa" py="40px" px="50px" h="100%" flexDir="column">
      <Text fontWeight="bold" fontSize="30px">
        Top projects for you this week
      </Text>
      <Box mt="40px" bgColor="#e7e7e7" h="2px" w="100%"></Box>
      <Flex
        pt="40px"
        gap="30px"
        justify="center"
        flexDir={isDesktop ? 'row' : 'column'}
      >
        {projects.map((project, id) => {
          return <ProjectCard project={project} key={id} />;
        })}
      </Flex>
    </Flex>
  );
};

export default ProjectsExplore;
