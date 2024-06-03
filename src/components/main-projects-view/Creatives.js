import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import StupaidLogo from './../../assets/images/stupaid-logo.svg'
import CreativeCard from './CreativeCard'

const Creatives = () => {

    const creativesList = [
        {
            image: StupaidLogo,
            location: "Vancouver, Canada",
            school: "University of British Colubmia",
            work: "Remote",
            name: "Byron Wang",
            endorsements: 4,
            website: "https://www.stupaid.work/"
        },
        {
            image: StupaidLogo,
            location: "Vancouver, Canada",
            school: "Uniersity of British Colubmia",
            work: "Remote",
            name: "Alan Wang",
            endorsements: 4,
            website: "https://www.stupaid.work/"
        },
        {
            image: StupaidLogo,
            location: "Vancouver, Canada",
            school: "Uniersity of British Colubmia",
            work: "Remote",
            name: "Aayush Kogar",
            endorsements: 4,
            website: "https://www.stupaid.work/"
        }
    ]

  return (
    <Flex
        display='flex'
        flexDirection='column'
    >
      {creativesList.map((creative, index) => (
        <CreativeCard
          key={index}
          image={creative.image}
          location={creative.location}
          school={creative.school}
          work={creative.work}
          name={creative.name}
          endorsements={creative.endorsements}
          website={creative.website}
        />
      ))}
    </Flex>
  )
}

export default Creatives
