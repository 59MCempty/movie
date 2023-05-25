import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {URLIMG} from "./utils/api.js";
import {apiMovieDetails} from "./utils/api.js";
import {BsClockFill} from "react-icons/bs"
import Rating from "./Rating.jsx";
import CastList from "./CastList.jsx";
import VideoIntroduce from "./VideoIntroduce.jsx";
import PosterMoive from "./PosterMoive.jsx";
import SimilarMovies from "./SimilarMovies.jsx";
import Spinner from "./Spinner.jsx";


const MediaDetails = () => {
	const [movieDetails, setMovieDetails] = useState([])
	const location = useLocation()
	const movie = location.state.movie
	const media_type = location.state.media_type

	const getMovieDetails = async (movie_id, kind) => {
		const response = await apiMovieDetails(movie_id, kind)
		if (response) {
			setMovieDetails(response)
		}
	}

	useEffect(() => {
		getMovieDetails(movie?.id, media_type,)
	}, [movie?.id])

	const minutes = (movieDetails?.runtime % 60) + "m"
	const hour = Math.floor(movieDetails?.runtime / 60) + "h"
	const runtime = hour + " " + minutes
	const date = (new Date(movieDetails?.release_date)).toLocaleDateString('en-GB')

	return (
		movieDetails &&
		<div className="background relative">
			<img
				className="bannerImg opacity-50"
				src={`${URLIMG}original/${movieDetails?.backdrop_path || movieDetails?.poster_path}`}
				alt="background"/>
			<div className="absolute top-[60%] w-full grid grid-cols-5 h-[650px]">
				<div className="col-span-2 flex justify-end opacity-85">
					<div className="w-[85%] h-full shadow-xl ">
						<img
							className="h-full w-full object-cover"
							src={`${URLIMG}original/${movieDetails?.backdrop_path}`} alt={`${movieDetails?.title}`}/>
					</div>
				</div>
				<div className="col-span-3 text-white px-10 pr-20 font-medium grid-rows-5">
					<div className="flex flex-col gap-y-5 row-span-3">
						<h1 className="text-6xl">{movieDetails?.title || movieDetails?.original_title}</h1>
						<span className="flex gap-x-3">
						{movieDetails?.genres?.map((item) =>
							<h1 key={item?.id} className="border p-4 border-red-600 text-lg bg-red-700">
								{item?.name}
							</h1>
						)}
					</span>
						<h1 className="text-xl flex gap-x-4 text-orange-400">{movieDetails?.status}: {date} <span
							className="uppercase">({movieDetails?.original_language})</span>
							<span className="flex items-center"><BsClockFill className="mr-1.5"/> {runtime}</span>
						</h1>
						<Rating rating={movieDetails?.vote_average}/>
						<p className="text-xl">{movieDetails?.overview}</p>
					</div>
					<div className="text-3xl w-full flex flex-col gap-y-6 h-full row-span-1">
						<h1 className="border-b-4 border-red-600 w-[8%]">Cast</h1>
						{movie && <CastList movie={movie} media={media_type}/>}
					</div>
				</div>
				{movie &&
					<section className="h-[80%] w-full col-span-5 flex flex-col gap-y-10 my-20 px-20">
						<VideoIntroduce movie={movie} media={media_type} param="videos"/>
						<PosterMoive movie={movie} media={media_type} param="images"/>
						<SimilarMovies movie={movie} media={media_type}/>
					</section>}
			</div>


		</div>
	);
};

export default MediaDetails;
