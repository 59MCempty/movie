import React, {useEffect, useState} from 'react'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from './Card.jsx'

const RowComponents = ({category, title, idx, media}) => {
	const moveLeft = () => {
		let move = document.getElementById("slide" + idx)
		move.scrollLeft -= 500
	}
	const moveRight = () => {
		let move = document.getElementById("slide" + idx)
		move.scrollLeft += 500
	}

	return (
		category &&
		<div className="mx-3 mt-10">
			<div
				className="text-white w-[18%] hover:w-[20%] pl-1 py-4 mx-4 my-2 flex items-center gap-x-2 group">
				<h1 className="capitalize font-bold text-3xl">
					{title}
				</h1>
			</div>
			<div className="px-3 flex items-center mt-3 relative group">
				<BsFillArrowLeftCircleFill
					onClick={moveLeft}
					className="buttonSlide left-0 group-hover:opacity-100"
					size={40}/>
				<div
					id={'slide' + idx}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
					{category?.map(item =>
						<div
							key={item?.id}
							className="inline-block p-4 space-x-3 transition-all ease-out duration-500 delay-150 cursor-pointer hover:mx-2 hover:border">
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
