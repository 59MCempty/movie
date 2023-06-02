import React, {useEffect, useState} from 'react'
import trendingApi from "./utils/modules/trending.api.js"
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from './Card.jsx'
import {Link} from 'react-router-dom'

const RowTrending = ({title, idx}) => {

	const [moviesList, setMovieList] = useState([])

	const dataTredingPopular = async (type) => {
		const res = await trendingApi.getTrending(type)
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

	return (
		moviesList &&
		<div className="mx-3 my-10">
			<div
				className="text-white w-full px-6 py-5 flex items-center justify-between gap-x-2">
				<h1 className="capitalize font-bold text-3xl border-l-4 ml-2 pl-3">
					{title} Trending
				</h1>
				<div className={`${title === 'all' ? 'hidden' : 'block'}`}>
					<Link
						to={`/${title}`}
						className="text-xl font-medium border-2 px-5 py-2 rounded-xl hover:bg-gray-500 transition duration-500 delay-150 ease-in-out"
					>View More</Link>
				</div>
			</div>
			<div className="px-3 flex items-center mt-3 relative group">
				<BsFillArrowLeftCircleFill
					onClick={moveLeft}
					className="buttonSlide left-0 group-hover:opacity-100"
					size={40}/>
				<div
					id={'slide' + idx}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
					{moviesList?.map(item =>
						<div
							key={item?.id}
							className="inline-block space-x-3 transition-all ease-in-out mx-5 duration-300 delay-150 cursor-pointer hover:mx-7">
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
