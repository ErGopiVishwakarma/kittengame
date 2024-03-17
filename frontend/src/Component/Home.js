import { Box, Button, Flex, Image, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import image from '../assets/imageName.webp'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserData } from '../Redux/actionType'

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let d = useSelector(store => console.log(store))

    const [name, setName] = useState("");
    let history = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch()

    const startGame = async () => {
        let button = document.getElementById("button");
        if (!name) {
            toast({
                title: '',
                description: "enter username to start game",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top'
            })
            return;
        }

        button.value = "Starting...";
        fetch('https://determined-elk-shawl.cyclic.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ name })
        }).then((res) => res.json()).then(ans => {
            localStorage.setItem('username', ans?.name)
            let { name, defuseCards, currentCard, score, deck } = ans
            dispatch({ type: UserData, payload: { name, defuseCards, currentCard, score, deck } })
            button.value = "Start Game";
            history("/game");
        }).catch(error => {
            toast({
                title: '',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top'
            })
        })
    };

    useEffect(() => {
        let isName = localStorage.getItem('username') || ''
        if (isName) {
            history('/game')
        }
    }, [])

    return (
        <Flex
            height="100vh"
            backgroundImage={`url(${image})`}
            backgroundSize="cover"
            backgroundPosition="center"
            position="relative"
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Flex direction="column" justifyContent="center" alignItems="center" h="100%" w={'350px'} gap={'30px'}
                border={'1px solid white'}
                height={'fit-content'}
                padding={'50px'}
                backgroundColor={'brown'}
                borderRadius={'20px'}
                boxShadow={"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}
            >
                <Input color={'white'} placeholder="enter username" _placeholder={{ color: 'white' }} mb={2} onChange={(e) => setName(e.target.value)} />
                <Input color={'white'} type='button' value={'Start Game'} w={'100%'} id='button' onClick={startGame} />

                <span onClick={onOpen} style={{ fontSize: '18px', fontStyle: 'italic', color: 'white', fontWeight: 'bolder', cursor: 'pointer' }}>Guidlines</span>

                <Modal isOpen={isOpen} onClose={onClose} bg={'brown'}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Rules</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction={'column'} gap={'15px'}>
                                <Text><span style={{ paddingRight: '5px', fontWeight: 'bolder' }}>1-</span>If the card drawn from the deck is a cat card, then the card is removed from the deck.</Text>
                                <Text><span style={{ paddingRight: '5px', fontWeight: 'bolder' }}>2-</span>If the card is exploding kitten (bomb) then the player loses the game.</Text>
                                <Text><span style={{ paddingRight: '5px', fontWeight: 'bolder' }}>3-</span>If the card is defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</Text>
                                <Text><span style={{ paddingRight: '5px', fontWeight: 'bolder' }}>4-</span>If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</Text>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>
        </Flex>
    )
}

export default Home
