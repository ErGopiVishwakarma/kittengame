import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const data = useSelector(store=>store?.score)
    const history = useNavigate()
    const exitFun = () => {
        localStorage.removeItem('username')
        history('/')
    }
    return (
        <Flex
            h={'80px'}
            w={'100%'}
            justifyContent={'space-between'}
            px={'80px'}
            alignItems={'center'}
            boxShadow="rgb(38, 57, 77) 0px 10px 10px -10px"
        >
            <Text
                color={'white'}
                fontSize={'30px'}
                fontStyle={'italic'}
                fontWeight={'bolder'}
            >Exploding Kitten</Text>

            <Text
                color={'white'}
                fontSize={'25px'}
                fontStyle={'italic'}
                fontWeight={'bolder'}
            >Matches You Won: <span style={{color:'green'}}>{data ? data : 0}</span></Text>

            <Flex gap={'50px'}>
                <Text
                    color={'white'}
                    fontSize={'20px'}
                    fontStyle={'italic'}
                    fontWeight={'bolder'}
                >Rules</Text>

                <Text
                    onClick={exitFun}
                    color={'black'}
                    fontSize={'20px'}
                    fontStyle={'italic'}
                    fontWeight={'bolder'}
                    cursor={'pointer'}
                >Exit</Text>
            </Flex>
        </Flex>
    )
}

export default Navbar
