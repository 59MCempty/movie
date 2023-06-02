import React, {useEffect, useState} from 'react'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from './Card.jsx'

const RowComponents = ({item, media, index}) => {

	const title = Object.keys(item)[0]
	const moveLeft = () => {
		let move = document.getElementById("slide" + index)
		move.scrollLeft -= 500
	}
	const moveRight = () => {
		let move = document.getElementById("slide" + index)
		move.scrollLeft += 500
	}

	return (
		item &&
		<div className="mt-10">
			<div
				className="text-white w-[18%] hover:w-[20%] px-6 flex items-center gap-x-2 group">
				<h1 className="capitalize font-bold text-3xl ml-1 border-l-4 pl-3">
					{title.replaceAll("_", " ")}
				</h1>
			</div>
			<div className="px-3 flex items-center mt-3 relative group">
				<BsFillArrowLeftCircleFill
					onClick={moveLeft}
					className="buttonSlide left-0 group-hover:opacity-100"
					size={40}/>
				<div
					id={'slide' + index}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
					{Object.values(item)[0]?.map(item =>
						<div
							key={item?.id}
							className="inline-block p-4 space-x-3 transition-all ease-out duration-300 delay-150 cursor-pointer hover:mx-7">
							<Card item={item} media={media}/>
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

export default RowComponents
