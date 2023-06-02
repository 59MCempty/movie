import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import urlConfigs from "./utils/modules/url.js";
import VideoIntroduce from "./VideoIntroduce.jsx";
import PosterMoive from "./PosterMoive.jsx";
import SimilarMovies from "./SimilarMovies.jsx";
import MovieDetails from "./MoiveDetails.jsx"
import mediaApi from "./utils/modules/media.api.js";


const MediaDetails = () => {
	const [movieDetails, setMovieDetails] = useState([])
	const location = useLocation()
	const movie = location.state.movie
	const media_type = location.state.media_type
	const getMovieDetails = async (movie_id, media_type) => {
		if (media_type === "movie") {
			const response = await mediaApi.getMovieType(movie_id)
			if (response) {
				setMovieDetails(response)
			}
		} else if (media_type === 'tv') {
			const response = await mediaApi.getSeriesType(movie_id)
			if (response) {
				setMovieDetails(response)
			}
		} else {
			return -1
		}
	}

	useEffect(() => {
		getMovieDetails(movie?.id, media_type)
	}, [movie?.id])


	return (
		movieDetails &&
		<div className="background relative">
			<img
				className="bannerImg opacity-50"
				src={urlConfigs.backdropPath(movieDetails?.backdrop_path)}
				alt="background"/>
			<div className="absolute top-[60%] w-full grid grid-cols-5 h-[650px]">
				<div className="col-span-2 flex justify-end opacity-85">
					<div className="w-[65%] h-full shadow-xl ">
						<img
							className="h-full w-full object-cover"
							src={urlConfigs.backdropPath(movieDetails?.backdrop_path || movieDetails?.poster_path)}
							alt={`${movieDetails?.title}`}/>
					</div>
				</div>
				<div className="col-span-3 text-white px-10 pr-20 font-medium grid-rows-5">
					<MovieDetails movieDetails={movieDetails} movie={movie} media_type={media_type}/>
				</div>
				{movie &&
					<section className="h-[80%] w-full col-span-5 flex flex-col gap-y-10 my-20 px-20">
						<VideoIntroduce movie={movie} media={media_type}/>
						<PosterMoive movie={movie} media={media_type}/>
						<SimilarMovies movie={movie} media={media_type}/>
					</section>}
			</div>


		</div>
	);
};

export default MediaDetails;
