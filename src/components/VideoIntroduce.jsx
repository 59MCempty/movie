import React, {useEffect, useState} from 'react';
import {apiMovieDetails} from "./utils/api.js";

const VideoIntroduce = ({movie, param, media}) => {
	const [trailers, setTrailers] = useState([]);
	//const trailers = []
	const YOUTUBE_LINK = 'https://www.youtube.com/embed/'
	const videoDatas = async (movie_id, kind, param) => {
		const response = await apiMovieDetails(movie_id, kind, param)
		// if (response.results) {
		// 	response?.results.slice(0, 1).map(movie => {
		// 		if (movie?.site.toString().toLowerCase() === "youtube" && trailers.includes(YOUTUBE_LINK + movie?.key) === false) {
		// 			setTrailers((prevState) =>
		// 				[...prevState, YOUTUBE_LINK + movie?.key + "?rel=0"]
		// 			)
		// 		}
		// 	})
		// }
		if (response?.results && trailers.includes(YOUTUBE_LINK + response?.results[0].key) === false) {
			setTrailers(YOUTUBE_LINK + response?.results[0]?.key + "?rel=0")
		}
	}


	useEffect(() => {
		videoDatas(movie?.id, media, `/${param}`)
	}, [])

	return (

		<div className="h-full w-full flex gap-y-3 flex-col items-center justify-center">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium">trailer</h1>
			<div
				className="relative w-[1024px] h-full max-w-5xl shadow-xl flex items-center overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide">
				<div className="w-full h-full">
					{/*{*/}
					{/*	trailers?.map((movie, index) =>*/}
					{/*		<div key={index} className='relative w-full h-full inline-block mr-4'>*/}
					{/*			<iframe className="w-full h-full aspect-video" src={movie}></iframe>*/}
					{/*		</div>*/}
					{/*	)*/}
					{/*}*/}
					<div className='relative w-full h-full inline-block mr-4'>
						<iframe className="w-full h-full aspect-video" src={trailers}></iframe>
					</div>
				</div>
			</div>

		</div>

	);
};

export default VideoIntroduce;
