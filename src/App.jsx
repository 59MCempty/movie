import React from 'react'
import Homepage from './components/Homepage.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Populate from './components/Populate.jsx'
import Tv_show from './components/Top_rated.jsx'
import Upcoming from './components/Upcoming.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <BrowserRouter>
        <div className="h-screen w-full">
            <Navbar />
            <Routes >
                <Route path='/' element={<Homepage />} />
                <Route path='/popular' element={<Populate />} />
                <Route path='/top_rated' element={<Tv_show />} />
                <Route path='/upcoming' element={<Upcoming />} />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
