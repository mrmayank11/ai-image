import React from 'react'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/navbar';

const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

{/* <Navbar /> */ }
