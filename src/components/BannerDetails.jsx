import React from 'react';
import {BsFillPlayFill} from "react-icons/bs";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import urlConfigs from "./utils/modules/url.js";

const BannerDetails = ({media}) => {
	return (
		<div>
			<img
				className="bannerImg"
				src={`${urlConfigs.backdropPath(media?.media?.backdrop_path || media?.media?.poster_path)}`}
				alt="banner"/>
			<div className="shadowBanner"></div>
			<div className="text-white w-full flex flex-col absolute top-[30%] pl-20">
				<div className="flex items-center gap-x-5">
					<button
						className="buttonBanner hover:bg-black hover:border-black bg-gray-900 border-gray-800">
						<BsFillPlayFill size={40}/> <span>Play</span></button>
					<button
						className="buttonBanner hover:bg-gray-300 border-gray-50">
						<AiOutlineExclamationCircle size={40}/>
						{media?.media_type === "movie" ?
							<Link to={`/movie/${media?.media?.id}`} state={{
								movie: media?.media,
								media_type: media?.media_type
							}}>Details</Link> :
							<Link to={`/tv/${media?.media?.id}`} state={{
								movie: media?.media,
								media_type: media?.media_type
							}}>Details</Link>}
					</button>
				</div>
				<div className="flex flex-col gap-y-2">
					<h1 className="text-3xl">{media?.media?.title || media?.media?.original_title || media?.media?.name || media?.media?.original_name}</h1>
					<h1 className="text-gray-400">Release
						Date: {media?.media?.release_date || media?.media?.first_air_date}</h1>
					<h1 className="w-[50%] text-lg">{media?.media?.overview}</h1>
				</div>
			</div>
		</div>
	);
};

export default BannerDetails;
