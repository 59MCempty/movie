import React from 'react'
import Homepage from './components/Homepage.jsx'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Movies from './components/Movies.jsx'
import Navbar from './components/Navbar.jsx'
import Tv_shows from "./components/Tv_shows.jsx";
import MediaDetails from "./components/MediaDetails.jsx";
import SearchPage from "./components/SearchPage.jsx";
import CastInformation from "./components/CastInformation.jsx";
import Cast from "./components/Cast.jsx";

function App() {
	return (
		<BrowserRouter>
			<div className="h-screen w-full lg:h-[140vh]">
				<Navbar/>
				<Routes>
					<Route path='/' element={<Homepage/>}/>
					<Route path='/movie' element={<Movies/>}/>
					<Route path='/tv' element={<Tv_shows/>}/>
					<Route path='/movie/:id' element={<MediaDetails/>}/>
					<Route path='/tv/:id' element={<MediaDetails/>}/>
					<Route path='/search' element={<SearchPage/>}/>
					<Route path='/person' element={<Cast/>}/>
					<Route path='/person/:id' element={<CastInformation/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
