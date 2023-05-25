import React, {useEffect, useState} from 'react';
import {apiMovieDetails, URLIMG} from "./utils/api.js";
import {HiChevronRight, HiChevronLeft} from "react-icons/hi"

const CastList = ({movie, media}) => {
	const [castList, setCastList] = useState([])

	const getCastData = async (movie_id, kind, param) => {
		const response = await apiMovieDetails(movie_id, kind, param)
		if (response) {
			setCastList(response?.cast)
		}
	}

	useEffect(() => {
		getCastData(movie?.id, media, "/credits")
	}, [])
	

	const moveLeft = () => {
		let move = document.getElementById("slide")
		move.scrollLeft -= 500
	}
	const moveRight = () => {
		let move = document.getElementById("slide")
		move.scrollLeft += 500

	}
	return (
		<div className="max-w-full flex items-center ">
			<div className="w-full relative group">
				<button
					onClick={moveLeft}
					className="absolute top-0 left-0 h-full bg-gray-800/50 opacity-40 group-hover:opacity-100 transition ease-in duration-500">
					<HiChevronLeft size={32}/>
				</button>
				<div
					id="slide"
					className="flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-x-5 group">
					{castList?.map(cast =>
						<div key={cast?.cast_id} className="min-w-[200px] h-full inline-block cursor-pointer ">
							<img src={`${URLIMG}w500${cast?.profile_path}`} alt={cast?.name}
								 className="h-[240px] w-[200px] object-cover"/>
							<h1 className="text-lg font-normal bottom-0 bg-gray-950/80 text-gray-400 pl-3">
								{cast?.name}
							</h1>
						</div>
					)}
				</div>
				<button
					onClick={moveRight}
					className="absolute top-0 right-0 h-full bg-gray-800/80 opacity-40 group-hover:opacity-100 transition ease-in duration-500">
					<HiChevronRight size={32}/>
				</button>
			</div>
		</div>
	);
};

export default CastList;
