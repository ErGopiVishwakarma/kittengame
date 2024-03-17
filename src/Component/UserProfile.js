import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const userData = useSelector((store)=>store)
    return (
        <Flex direction={'column'} mt={'100px'} gap={'50px'} p={'30px'}>
            <Flex color={'white'}
                justifyContent={'center'}
                alignItems={'center'}
                direction={'column'}
                gap={'10px'}
                fontStyle={'italic'}>
                <Text fontSize={'22px'}>username</Text>
                <Text fontSize={'25px'}>{userData?.name}</Text>
            </Flex>
            <Flex color={'white'}
                justifyContent={'center'}
                alignItems={'center'}
                direction={'column'}
                gap={'10px'}
                fontStyle={'italic'}>
                <Text fontSize={'22px'}>score</Text>
                <Text fontSize={'30px'}>{userData?.score ? userData?.score : 0}</Text>
            </Flex>
        </Flex>
    )
}

export default UserProfile