import React from 'react';
import {BsClockFill} from "react-icons/bs";
import Rating from "./Rating.jsx";
import CastList from "./CastList.jsx";

const MoiveDetails = ({movieDetails, movie, media_type}) => {
	const minutes = (movieDetails?.runtime % 60) + "m"
	const hour = Math.floor(movieDetails?.runtime / 60) + "h"
	const runtime = hour + " " + minutes
	const date = (new Date(movieDetails?.release_date)).toLocaleDateString('en-GB')
	return (
		<>
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
		</>


	);
};

export default MoiveDetails;
