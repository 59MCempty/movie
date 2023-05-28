import React, {useEffect, useState} from 'react';
import detailsApi from "./utils/modules/mediaDetails.api.js";
import urlConfigs from "./utils/modules/url.js";
import {HiChevronRight, HiChevronLeft} from "react-icons/hi"
import {Link} from "react-router-dom";

const CastList = ({movie, media}) => {
	const [castList, setCastList] = useState([])

	const getCastData = async (media, movie_id, category) => {
		const response = await detailsApi.getMediaList(media, movie_id, category)
		if (response) {
			setCastList(response?.cast)
		}
	}

	useEffect(() => {
		getCastData(media, movie?.id, "credits")
	}, [])

	const moveLeft = () => {
		let move = document.getElementById("slide")
		move.scrollLeft -= 500
	}
	const moveRight = () => {
		let move = document.getElementById("slide")
		move.scrollLeft += 500

	}
	console.log("castList >>>",castList)
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
						<Link to={`/person/${cast?.id}}`} state={{id: cast?.id}} key={cast?.cast_id} className="min-w-[200px] h-full inline-block cursor-pointer ">
							<img
								src={urlConfigs.posterPath(cast?.profile_path)} alt={cast?.name}
								className="h-[240px] w-[200px] object-cover"/>
							<h1 className="text-lg font-normal bottom-0 bg-gray-950/80 text-gray-400 pl-3">
								{cast?.name}
							</h1>
						</Link>
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
