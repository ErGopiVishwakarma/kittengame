import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import { getUserData } from '../Redux/action'
import { useSelector } from 'react-redux'

const Leaderboard = () => {
    const [data ,setData] = useState([])
    const score = useSelector(store=>store.score)
    useEffect(()=>{
       getUserData().then(res=>setData(res.data)).catch(err=>console.log(err))       
    },[score])
    return (
        <Accordion allowToggle>
            <AccordionItem p={'10px'}>
                <h2>
                    <AccordionButton w={'300px'}>
                        <Box as="span" flex='1' textAlign='left' textColor={'#167c8a'} fontSize={'23px'} fontStyle={'italic'} bg={'transparent'}>
                            See Leaderboard
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={'white'} w={'300px'} h={'400px'} display={'flex'} gap={'8px'} flexDir={'column'}>
                    <Flex justifyContent={'space-between'} h={'40px'} w={'100%'} borderBottom={'1px solid white'} p={'8px'} borderRadius={'10px'} >
                        <Text color={'brown'} fontWeight={'bolder'} fontSize={'19px'}>UserName</Text>
                        <Text color={'green'} fontWeight={'bolder'} fontSize={'19px'}>Score</Text>
                    </Flex>
                    <Flex direction={'column'} gap={'3px'} overflowY={'auto'} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        {
                          data?.length > 0 &&  data?.map((el, index) => { // added index for unique keys
                                return <Flex key={index} justifyContent={'space-between'} h={'40px'} w={'100%'} p={'8px'} borderRadius={'10px'} borderBottom={'1px solid white'} _hover={{
                                    backgroundColor: '#735555',
                                }} >
                                    <Text color={'#0c0d0d'} fontWeight={'bolder'} >{el?.name}</Text>
                                    <Text fontSize={'20px'} color={'black'} fontWeight={'bolder'}>--</Text>
                                    <Text color={'#463215'} fontWeight={'bolder'} >{el?.score? el?.score : 0}</Text>
                                </Flex>
                            })
                        }
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion >
    )
}

export default Leaderboard
