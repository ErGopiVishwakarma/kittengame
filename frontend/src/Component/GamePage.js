import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Leaderboard from './Leaderboard'
import suffleCard from '../assets/shuffleCard.png'
import catCard from '../assets/catcard.jpg'
import defuseCard from '../assets/defuseCard.jpg'
import explodeCard from '../assets/explodeCard.png'
import cardImage from '../assets/card.jpg'
import UserProfile from './UserProfile'
import { useNavigate } from 'react-router-dom'
import PopupMessage from './PopupMessage'
import { UpdateScore, UserData } from '../Redux/actionType'


const GamePage = () => {
    const user = useSelector(store => store);
    console.log('user', user)
    const dispatch = useDispatch();
    const [deck, setDeck] = useState([]);
    const [currentCard, setCurrentCard] = useState("");
    const [defuseCards, setDefuseCards] = useState([]);
    const [popup, setPopup] = useState(false)
    const [popupData, setPopupData] = useState({})
    const history = useNavigate()
    let cardArr = ["Suffle", "Defuse", "Cat", "Explode",]


    useEffect(() => {
        let isName = localStorage.getItem('username') || ''
        if (!isName) {
            history('/')
        }
    }, [])

    useEffect(() => {
        // fetching user data from server 
        const name = localStorage.getItem('username') || ''
        fetch('https://determined-elk-shawl.cyclic.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ name })
        }).then((res) => res.json()).then(ans => {
            let { name, defuseCards, currentCard, score, deck } = ans
            dispatch({ type: UserData, payload: { name, defuseCards, currentCard, score, deck } })
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        // initializing game status 
        initialigingGameStatus()
    }, [user])

    // function to generate randome deck  
    const randomDeckGenerate = () => {
        const i1 = Math.floor(Math.random() * 4);
        const i2 = Math.floor(Math.random() * 4);
        const i3 = Math.floor(Math.random() * 4);
        const i4 = Math.floor(Math.random() * 4);
        const i5 = Math.floor(Math.random() * 4);

        let randromDeckArray = [cardArr[i1], cardArr[i2], cardArr[i3], cardArr[i4], cardArr[i5]];
        let shuffleCount = 0;
        randromDeckArray = randromDeckArray.map((card) => {
            if (card === "Suffle") {
                shuffleCount++;
                if (shuffleCount > 1) {
                    card = "Cat";
                }
            }
            return card;
        });
        return randromDeckArray;
    };


    const initialigingGameStatus = () => {
        if (user?.deck?.length < 5 && user?.deck?.length > 0) {
            setDeck(user?.deck);
            setDefuseCards(user?.defuseCards);
            setCurrentCard(user?.currentCard);
        } else if (user?.deck?.length === 5) {
            setDeck(user?.deck);
            setDefuseCards([]);
            setCurrentCard("");
        } else {
            setDeck(randomDeckGenerate());
            setDefuseCards([]);
            setCurrentCard("");
        }
    };

    const updateUserData = (deck, defuseCards, currentCard, gameStatus) => {
        dispatch({
            type: UserData, payload: {
                deck, defuseCards, currentCard
            }
        })
        let obj = {
            name: user?.name,
            score: user?.score + 1
        }
        if (gameStatus === 'Won') {
            dispatch({ type: UpdateScore })
            fetch('https://determined-elk-shawl.cyclic.app/userscore', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(obj)
            }).then(ans => ans.json()).then(res => console.log(res)).catch(err => console.log(err))
        }
    }

    const showPopup = (text, buttonText) => {
        setPopup(true)
        setPopupData({ text, buttonText })
    }

    const revealCardFromDeck = () => {
        let temp = [...deck];
        //    removing element from deck 
        const poppedCard = temp.pop();
        // setting current card 
        setCurrentCard(poppedCard);
        setDeck([...temp]);
        // checking the type of card  
        if (poppedCard === "Cat") {
            if (!temp.length) {
                setTimeout(() => {
                    updateUserData(randomDeckGenerate(), [], "", "Won");
                }, 1000);
                showPopup("You Won", "Play Again");
            } else {
                // updating use data 
                updateUserData(temp, defuseCards, poppedCard, "None");
            }

        } else if (poppedCard === "Suffle") {
            // restarting the game  
            setTimeout(() => {
                updateUserData(randomDeckGenerate(), [], "", "None");
            }, 1000);
            showPopup("Game Shuffled", "Continue");
        } else if (poppedCard === "Defuse") {
            if (!temp.length) {
                setTimeout(() => {
                    updateUserData(randomDeckGenerate(), [], "", "Won");
                }, 700);
                showPopup("You Won", "Play Again");
            } else {
                // updating defuse card   
                let data = [...defuseCards];
                data.push(poppedCard);
                setDefuseCards(data);
                updateUserData(temp, data, poppedCard, "None");
            }
        } else if (poppedCard === "Explode") {
            if (defuseCards?.length) {
                if (!temp.length) {
                    setTimeout(() => {
                        updateUserData(randomDeckGenerate(), [], "", "Won");
                    }, 700);
                    showPopup("You Won", "Play Again");
                } else {
                    let data = [...defuseCards];
                    data.pop();
                    setDefuseCards(data);
                    updateUserData(temp, data, poppedCard, "None");
                }
            } else {
                setTimeout(() => {
                    updateUserData(randomDeckGenerate(), [], "", "Lost");
                }, 700);
                showPopup("You Lost Game", "Play Again");
            }
        }
    };

    const currentCardImageSrc = () => {
        if (currentCard === "") {
            return "";
        } else if (currentCard === "Suffle") {
            return suffleCard;
        } else if (currentCard === "Defuse") {
            return defuseCard;
        } else if (currentCard === "Cat") {
            return catCard;
        } else if (currentCard === "Explode") {
            return explodeCard;
        }
    };


    window.addEventListener('visibilitychange', function () {
        
        fetch('https://determined-elk-shawl.cyclic.app/pausegame', {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user)
        })
    })

    window.addEventListener('load', function () {
        
        fetch('https://determined-elk-shawl.cyclic.app/pausegame', {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user)
        })
    })


    return (
        <Box
            height="100vh"
            width="100vw"
            style={{
                background: 'linear-gradient(60deg, rgba(109,108,110,1) 9%, rgba(210,187,187,1) 90%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Navbar  */}
            <Navbar />
            {popup && <PopupMessage
                popupData={popupData}
                setPopup={setPopup}
            />}
            {/* bottom section  */}
            <Flex p={'30px'} justifyContent={'space-between'}>
                {/* left part username and score point   */}
                <UserProfile />
                {/* desk and card part here    */}
                <Flex direction={'column'} gap={'80px'} px={'40px'} >
                    <Flex gap={'120px'}>
                        <Flex direction={'column'} alignItems={'center'} w={'170px'} h={'240px'} gap={'5px'}>
                            <Text fontSize={'22px'} color={'brown'} fontWeight={'bolder'}>
                                {currentCard ? currentCard + " Card" : "Current Card"}
                            </Text>
                            <Flex w={'100%'} height={'100%'} bg={'#090808'} p={'10px'} borderRadius={'15px'}>
                                <Image src={currentCardImageSrc()} objectFit={'cover'} />
                            </Flex>
                        </Flex>
                        <Flex direction={'column'} alignItems={'center'} w={'170px'} h={'240px'} gap={'5px'} boxSizing='borderBox'>
                            <Text fontSize={'22px'} color={'brown'} fontWeight={'bolder'}>Defuse Card</Text>
                            <Flex w={'100%'} h={'240px'} bg={'#090808'} p={'10px'} borderRadius={'15px'}>
                                {defuseCards?.length && <Image src={defuseCard} h={'100%'} w={'100%'} alt='.' />}
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* reveal card  */}
                    <Flex direction={'column'} h={'fit-content'} gap={'15px'}>
                        <Text textAlign={'center'} fontSize={'22px'} fontStyle={'italic'} color={'green'} fontWeight={'bolder'} >click to reveal a card</Text>
                        <Flex position={'relative'}>
                            {deck?.map((card, index) => {
                                let left = index * 70
                                return (
                                    <Image
                                        key={card + index}
                                        onClick={revealCardFromDeck}
                                        alt=""
                                        style={{
                                            position: "absolute",
                                            width: "112px",
                                            height: '150px',
                                            left: `${left}px`

                                        }}
                                        src={cardImage}
                                    />
                                );
                            })}
                        </Flex>
                    </Flex>
                </Flex>
                {/* leaderboard part is here    */}
                <Flex><Leaderboard /></Flex>
            </Flex>
        </Box>
    )
}

export default GamePage