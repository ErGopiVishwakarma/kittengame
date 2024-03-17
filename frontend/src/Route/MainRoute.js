import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/Home'
import GamePage from '../Component/GamePage'

const MainRoute = () => {
  return (
    <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/game' element={<GamePage />} />
    </Routes>
  )
}

export default MainRoute