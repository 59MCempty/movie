import React, {useEffect, useState} from 'react'
import {FetchGetapi} from './utils/api.js'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from './Card.jsx'
import {Link} from 'react-router-dom'

const RowTrending = ({title, idx}) => {
	const [moviesList, setMovieList] = useState([])

	const dataTredingPopular = async (type) => {
		const res = await FetchGetapi(type)
		if (res?.length > 0) {
			setMovieList(res)
		}
	}

	useEffect(() => {
		dataTredingPopular(title)
	}, [])

	const moveLeft = () => {
		let move = document.getElementById("slide" + idx)
		move.scrollLeft -= 500
	}
	const moveRight = () => {
		let move = document.getElementById("slide" + idx)
		move.scrollLeft += 500

	}
	const noAll = title === 'all' ? "group-hover:hidden" : ""
	return (
		moviesList &&
		<div className="mx-3 mt-10">
			<Link
				to={`/${title === "all" ? "" : title}`}
				className="text-white w-[18%] hover:w-[20%] pl-1 py-4 mx-4 my-2 flex items-center gap-x-2 group">
				<h1 className="capitalize font-bold text-3xl">
					{title} Trending
				</h1>
				<span className={`pt-2 hidden transition delay-700 duration-300 ease-in-out group-hover:block group-hover:underline-offset-2 underline
					${noAll}`}
				>Watch All</span>
			</Link>
			<div className="px-3 flex items-center mt-3 relative group">
				<BsFillArrowLeftCircleFill
					onClick={moveLeft}
					className="buttonSlide left-0 group-hover:opacity-100"
					size={40}/>
				<div
					id={'slide' + idx}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">{moviesList?.map(item =>
					<div
						key={item?.id}
						className="inline-block px-3 space-x-3 transition-all ease-in-out duration-300 delay-150 cursor-pointer hover:mx-5">
						{item && <Card item={item} media={item?.media_type}/>}
					</div>
				)}
				</div>

				<BsFillArrowRightCircleFill
					onClick={moveRight}
					className="buttonSlide right-0 group-hover:opacity-100"
					size={40}/>
			</div>
		</div>
	)
}

export default RowTrending
