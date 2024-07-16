import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import CountryList from './CountryList'
import Modal from './Modal'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<CountryList/>} />
        {/* <Route path='/country-flag' element={<Modal/>} /> */}
      </Routes>

    </>
  )
}

export default App
