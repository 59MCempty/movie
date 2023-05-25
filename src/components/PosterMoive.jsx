import React, {useEffect, useState} from 'react';
import {apiMovieDetails, URLIMG} from "./utils/api.js";
const PosterMoive = ({movie, param, media}) => {

	const [posterList, setPosterList] = useState([]);
	const getBackdrop = async (movie_id, kind, param) => {
		const response = await apiMovieDetails(movie_id, kind, param)

		if (response) {
			setPosterList(response?.posters.slice(0, 5))
		}
	}

	useEffect(() => {
		getBackdrop(movie?.id, media, `/${param}`)
	},[])

	return (
		<div className="flex flex-col gap-y-3 items-center justify-center horizontall_bar">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium w-[12%]">Posters</h1>
			<div className="h-full max-w-full grid grid-cols-5 gap-x-5">
				{
					posterList.map((poster, index) =>
						<div  className="block" key={index}>
							<img className="h-[443px] w-[332px] inline-block object-cover" src={`${URLIMG}w500/${poster?.file_path}`} alt="poster"/>
						</div>
					)
				}
			</div>
		</div>
	);
};

export default PosterMoive;
