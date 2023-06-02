import React, {useEffect, useState} from 'react'
import logo from '../assets/IFC Film.svg'
import {Link, NavLink} from "react-router-dom";


const Navbar = () => {
	const [isScroll, setIsScroll] = useState(false)

	const navScroll = () => {
		if (window.scrollY > 0) {
			setIsScroll(true)
		} else {
			setIsScroll(false)
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", navScroll)
	}, [])


	return (
		<div
			className={`grid grid-cols-12 text-black px-6 fixed w-full z-[1000] transition ease-in-out duration-300 top-0 left-0 ${isScroll ? "bg-gray-950/90" : "bg-transparent"}`}>
			<div className="w-[30%] grid place-items-center h-full col-span-2">
				<img src={logo} alt="logo"/>
			</div>

			<div className="col-span-3 h-full">
				<ul className="flex justify-evenly items-center list-none h-full text-xl">
					<NavLink to="/" className={({isActive}) =>
						isActive ? "navbarActive" : "navbarHeader"}>Home</NavLink>

					<NavLink to="/movie" className={({isActive}) =>
						isActive ? "navbarActive" : "navbarHeader"}>Movies</NavLink>

					<NavLink to="/tv" className={({isActive}) =>
						isActive ? "navbarActive" : "navbarHeader"}>TV Show</NavLink>
				</ul>
			</div>

			<div className="col-span-5 flex items-center justify-center">
			</div>
			<div className="col-span-2 flex justify-end">
				<Link to="search" className="navbarHeader text-xl uppercase items-center flex my-3">search</Link>
			</div>
		</div>
	)
}

export default Navbar
