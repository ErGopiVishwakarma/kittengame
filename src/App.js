import logo from './logo.svg';
import './App.css';
import { Box, Flex, Input, Text, Button, Image } from '@chakra-ui/react';
import MainRoute from './Route/MainRoute';
import image from './assets/kittenHomePage.jpg'

function App() {
  return (
    <Box w={'100%'} h={'100%'}>
    {/* <Image src={image} /> */}
      <MainRoute />
    </Box>
  );
}

export default App;
